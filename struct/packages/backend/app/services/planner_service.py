"""
AI Study Planner Service
Generates personalized, adaptive study plans for GATE exam preparation
"""

from datetime import date, datetime, timedelta
from typing import List, Dict, Optional, Tuple
from sqlalchemy.orm import Session
from app.models import (
    StudyPlan, PlanSubject, PlanTopic, StudyTask, MockTestSchedule, Test, User
)
from app.schemas import (
    StudyPlanCreate, StudyTaskCreate, StudyTaskResponse, StudyPlanResponse
)


class PlannerService:
    """Core AI Study Planner Logic"""

    GATE_SUBJECTS = {
        "Data Structures": {"weightage": 12, "difficulty": 4},
        "Algorithms": {"weightage": 10, "difficulty": 4},
        "Operating Systems": {"weightage": 10, "difficulty": 3},
        "Database Management": {"weightage": 9, "difficulty": 3},
        "Networks": {"weightage": 9, "difficulty": 3},
        "Discrete Mathematics": {"weightage": 13, "difficulty": 4},
        "Digital Logic": {"weightage": 7, "difficulty": 2},
        "Theory of Computation": {"weightage": 8, "difficulty": 4},
        "Compiler Design": {"weightage": 7, "difficulty": 3},
        "Computer Architecture": {"weightage": 8, "difficulty": 2},
    }

    # Spaced Repetition Schedule (days after initial learning)
    SPACED_REPETITION_DAYS = [1, 3, 7, 15, 30]

    def create_study_plan(
        self,
        db: Session,
        user_id: int,
        plan_data: StudyPlanCreate
    ) -> StudyPlan:
        """
        Create a new personalized study plan
        
        Args:
            db: Database session
            user_id: User ID
            plan_data: Study plan input data
            
        Returns:
            Created StudyPlan with generated tasks
        """
        # Calculate total days until exam
        today = date.today()
        total_days = (plan_data.exam_date - today).days
        
        if total_days <= 0:
            raise ValueError("Exam date must be in the future")
        
        if total_days > 365:
            total_days = 365  # Cap at 1 year
        
        # Create study plan
        study_plan = StudyPlan(
            user_id=user_id,
            exam_date=plan_data.exam_date,
            daily_hours=plan_data.daily_hours,
            target_rank=plan_data.target_rank,
            current_level=plan_data.current_level,
            preferred_time=plan_data.preferred_time,
            completed_percentage=plan_data.completed_percentage,
            total_days=total_days,
            topics_count=0,
            weak_topics_count=0,
        )
        
        db.add(study_plan)
        db.flush()  # Get plan ID
        
        # Add subjects and topics
        total_topics = 0
        weak_topics = 0
        
        for subject_data in plan_data.subjects:
            plan_subject = PlanSubject(
                plan_id=study_plan.id,
                subject_name=subject_data.subject_name,
                confidence_level=subject_data.confidence_level,
                is_weak=subject_data.is_weak,
                time_allocated_hours=subject_data.time_allocated_hours,
            )
            db.add(plan_subject)
            db.flush()
            
            # Add topics for this subject
            for topic_data in subject_data.topics:
                plan_topic = PlanTopic(
                    subject_id=plan_subject.id,
                    topic_name=topic_data.topic_name,
                    confidence_level=topic_data.confidence_level,
                    is_weak=topic_data.is_weak,
                    priority=topic_data.priority,
                    weightage_percent=topic_data.weightage_percent,
                )
                db.add(plan_topic)
                total_topics += 1
                if topic_data.is_weak:
                    weak_topics += 1
        
        study_plan.topics_count = total_topics
        study_plan.weak_topics_count = weak_topics
        
        db.commit()
        
        # Generate day-wise study tasks
        self._generate_study_tasks(db, study_plan, plan_data)
        
        return study_plan

    def _generate_study_tasks(
        self,
        db: Session,
        plan: StudyPlan,
        plan_data: StudyPlanCreate
    ) -> None:
        """
        Generate day-wise study tasks based on plan parameters
        Uses adaptive scheduling with spaced repetition
        """
        current_date = date.today()
        daily_minutes = plan.daily_hours * 60
        
        # Sort subjects by confidence level (weak topics first)
        subjects = sorted(
            plan_data.subjects,
            key=lambda s: (not s.is_weak, s.confidence_level)
        )
        
        task_day = 0
        
        while current_date <= plan.exam_date:
            if task_day > plan.total_days:
                break
            
            # Schedule tasks for this day
            day_tasks = self._schedule_day_tasks(
                db=db,
                plan=plan,
                current_date=current_date,
                subjects=subjects,
                daily_minutes=daily_minutes,
                day_number=task_day,
                total_days=plan.total_days
            )
            
            current_date += timedelta(days=1)
            task_day += 1
        
        db.commit()

    def _schedule_day_tasks(
        self,
        db: Session,
        plan: StudyPlan,
        current_date: date,
        subjects: List,
        daily_minutes: int,
        day_number: int,
        total_days: int
    ) -> List[StudyTask]:
        """
        Schedule all tasks for a single day
        Implements adaptive load balancing and spaced repetition
        """
        tasks = []
        remaining_minutes = daily_minutes
        
        # Calculate stage in preparation (0-100%)
        progress_percent = (day_number / total_days) * 100 if total_days > 0 else 0
        
        # Determine task distribution based on progress stage
        if progress_percent < 30:
            # Foundation stage: Focus on learning
            task_distribution = {
                "Study": 0.6,
                "Practice": 0.3,
                "Revision": 0.1,
                "Mock": 0.0
            }
        elif progress_percent < 70:
            # Build stage: Increase practice, add revisions
            task_distribution = {
                "Study": 0.3,
                "Practice": 0.4,
                "Revision": 0.25,
                "Mock": 0.05
            }
        else:
            # Final stage: Heavy practice + mocks
            task_distribution = {
                "Study": 0.1,
                "Practice": 0.3,
                "Revision": 0.3,
                "Mock": 0.3
            }
        
        # Prioritize weak topics
        weak_subjects = [s for s in subjects if s.is_weak]
        strong_subjects = [s for s in subjects if not s.is_weak]
        prioritized_subjects = weak_subjects + strong_subjects
        
        subject_idx = 0
        
        for task_type, weight in task_distribution.items():
            task_minutes = int(remaining_minutes * weight)
            
            if task_minutes <= 0:
                continue
            
            # Get next subject (cycle through)
            if subject_idx >= len(prioritized_subjects):
                subject_idx = 0
            
            subject = prioritized_subjects[subject_idx]
            subject_idx += 1
            
            # Select a topic from subject
            topic = self._select_topic_for_task(
                db, subject, task_type, plan, current_date
            )
            
            if not topic:
                continue
            
            # Create task
            task = StudyTask(
                plan_id=plan.id,
                user_id=plan.user_id,
                task_date=current_date,
                subject=subject.subject_name,
                topic=topic.topic_name,
                task_type=task_type,
                description=self._generate_task_description(
                    task_type, subject.subject_name, topic.topic_name
                ),
                time_allocated_minutes=task_minutes,
                difficulty=self._calculate_difficulty(
                    topic.confidence_level, subject.is_weak
                ),
                mcq_count=self._get_mcq_count(task_type, task_minutes),
                pyq_count=self._get_pyq_count(task_type, task_minutes),
            )
            
            db.add(task)
            tasks.append(task)
        
        # Schedule mock tests
        if day_number % 7 == 0 and progress_percent > 40:
            self._schedule_mock_test(db, plan, current_date, progress_percent)
        
        return tasks

    def _select_topic_for_task(
        self,
        db: Session,
        subject,
        task_type: str,
        plan: StudyPlan,
        current_date: date
    ) -> Optional[PlanTopic]:
        """
        Intelligently select a topic for a task based on:
        - Task type (Study/Practice/Revision)
        - Topic confidence level
        - Last studied date
        - Spaced repetition schedule
        """
        topics = db.query(PlanTopic).filter(
            PlanTopic.subject_id == subject.id
        ).all()
        
        if not topics:
            return None
        
        if task_type == "Study":
            # Prefer unstudied or low-confidence topics
            return min(
                topics,
                key=lambda t: (
                    t.last_studied is not None,  # Unstudied first
                    t.confidence_level,          # Lower confidence first
                    t.revision_count             # Fewer revisions first
                )
            )
        
        elif task_type == "Practice":
            # Prefer topics studied 1-3 days ago
            return min(
                topics,
                key=lambda t: (
                    t.last_studied is None,      # Skip unstudied
                    abs((current_date - (t.last_studied or current_date)).days - 2),
                    t.confidence_level
                )
            )
        
        elif task_type == "Revision":
            # Spaced repetition logic
            return self._select_for_spaced_repetition(topics, current_date)
        
        return topics[0]

    def _select_for_spaced_repetition(
        self,
        topics: List[PlanTopic],
        current_date: date
    ) -> Optional[PlanTopic]:
        """
        Select topic due for spaced repetition
        Based on days since last study and target repetition schedule
        """
        due_topics = []
        
        for topic in topics:
            if topic.last_studied is None:
                continue
            
            days_since_study = (current_date - topic.last_studied).days
            
            # Check against spaced repetition schedule
            for target_days in self.SPACED_REPETITION_DAYS:
                if abs(days_since_study - target_days) < 2:  # Within 2 days
                    due_topics.append((topic, days_since_study))
                    break
        
        if due_topics:
            # Return topic most overdue
            return max(due_topics, key=lambda x: x[1])[0]
        
        # If none due, return topic with fewest revisions
        return min(topics, key=lambda t: t.revision_count)

    def _schedule_mock_test(
        self,
        db: Session,
        plan: StudyPlan,
        current_date: date,
        progress_percent: float
    ) -> None:
        """
        Schedule mock tests at strategic points
        Sectional early, full-length later
        """
        test_type = "Sectional" if progress_percent < 70 else "Full-length"
        
        # Find appropriate test (can be enhanced to select based on weak areas)
        test = db.query(Test).filter(
            Test.subject.ilike(f"%{test_type}%") if test_type == "Sectional" else Test.id.isnot(None)
        ).first()
        
        if test:
            schedule = MockTestSchedule(
                plan_id=plan.id,
                test_id=test.id,
                scheduled_date=current_date,
                test_type=test_type,
                target_score=None,
            )
            db.add(schedule)

    def _generate_task_description(
        self,
        task_type: str,
        subject: str,
        topic: str
    ) -> str:
        """Generate helpful task description"""
        descriptions = {
            "Study": f"Study {topic} in {subject}. Review concepts, formulas, and key points.",
            "Practice": f"Practice {topic} questions. Focus on understanding approach and optimization.",
            "Revision": f"Revise {topic}. Quick review of key concepts and common mistakes.",
            "Mock": f"Take full-length mock test covering {subject}. Simulate exam conditions.",
        }
        return descriptions.get(task_type, f"{task_type}: {topic}")

    def _calculate_difficulty(
        self,
        confidence_level: int,
        is_weak: bool
    ) -> str:
        """
        Calculate task difficulty based on topic confidence
        Weak topics get easier initial tasks, then progressively harder
        """
        if is_weak:
            return "Easy" if confidence_level <= 2 else "Medium"
        else:
            return "Medium" if confidence_level <= 3 else "Hard"

    def _get_mcq_count(self, task_type: str, minutes: int) -> int:
        """Calculate MCQ count based on task type and duration"""
        if task_type == "Study":
            return 0
        elif task_type == "Practice":
            return max(5, minutes // 3)  # ~3 min per MCQ
        elif task_type == "Revision":
            return max(3, minutes // 4)
        return 0

    def _get_pyq_count(self, task_type: str, minutes: int) -> int:
        """Calculate PYQ (Previous Year Question) count"""
        if task_type == "Practice":
            return max(2, minutes // 6)  # ~6 min per PYQ
        elif task_type == "Revision":
            return max(1, minutes // 8)
        return 0

    def get_day_plan(
        self,
        db: Session,
        plan_id: int,
        target_date: date
    ) -> List[StudyTask]:
        """Get all tasks scheduled for a specific date"""
        return db.query(StudyTask).filter(
            StudyTask.plan_id == plan_id,
            StudyTask.task_date == target_date
        ).order_by(StudyTask.created_at).all()

    def update_task_progress(
        self,
        db: Session,
        task_id: int,
        is_completed: bool = None,
        actual_time_minutes: int = None,
        difficulty_feedback: str = None,
        user_notes: str = None
    ) -> StudyTask:
        """
        Update task progress and trigger adaptive adjustments
        """
        task = db.query(StudyTask).filter(StudyTask.id == task_id).first()
        
        if not task:
            raise ValueError("Task not found")
        
        if is_completed is not None:
            task.is_completed = is_completed
            if is_completed:
                task.completed_at = datetime.utcnow()
        
        if actual_time_minutes is not None:
            task.actual_time_minutes = actual_time_minutes
        
        if difficulty_feedback is not None:
            task.difficulty_feedback = difficulty_feedback
        
        if user_notes is not None:
            task.user_notes = user_notes
        
        db.commit()
        
        # Trigger adaptive adjustments if task completed
        if task.is_completed:
            self._adapt_plan_on_completion(db, task)
        
        return task

    def _adapt_plan_on_completion(self, db: Session, task: StudyTask) -> None:
        """
        Adapt future tasks based on how user performed on this task
        Implements core AI logic for personalization
        """
        plan = db.query(StudyPlan).filter(StudyPlan.id == task.plan_id).first()
        
        if not plan or not task.difficulty_feedback:
            return
        
        # Get subject and topic
        subject = db.query(PlanSubject).filter(
            PlanSubject.plan_id == plan.id,
            PlanSubject.subject_name == task.subject
        ).first()
        
        if not subject:
            return
        
        topic = db.query(PlanTopic).filter(
            PlanTopic.subject_id == subject.id,
            PlanTopic.topic_name == task.topic
        ).first()
        
        if not topic:
            return
        
        # Update topic metrics
        topic.last_studied = task.task_date
        if task.task_type == "Revision":
            topic.revision_count += 1
            topic.next_revision = task.task_date + timedelta(days=7)
        
        # Adjust confidence based on feedback
        if task.difficulty_feedback == "Easy":
            # User found it easy - increase confidence
            topic.confidence_level = min(5, topic.confidence_level + 1)
            if topic.confidence_level >= 4:
                topic.is_weak = False
        elif task.difficulty_feedback == "Hard":
            # User found it hard - decrease confidence, mark as weak
            topic.confidence_level = max(1, topic.confidence_level - 1)
            if topic.confidence_level <= 2:
                topic.is_weak = True
        
        # Update plan statistics
        if topic.is_weak and not db.query(StudyTask).filter(
            StudyTask.plan_id == plan.id,
            StudyTask.topic == task.topic,
            StudyTask.task_date > task.task_date
        ).first():
            # Schedule additional practice for this weak topic
            self._schedule_additional_practice(db, plan, subject, topic, task.task_date)
        
        db.commit()

    def _schedule_additional_practice(
        self,
        db: Session,
        plan: StudyPlan,
        subject: PlanSubject,
        topic: PlanTopic,
        current_date: date
    ) -> None:
        """Schedule additional practice session for weak topic"""
        follow_up_date = current_date + timedelta(days=2)
        
        if follow_up_date > plan.exam_date:
            return
        
        extra_task = StudyTask(
            plan_id=plan.id,
            user_id=plan.user_id,
            task_date=follow_up_date,
            subject=subject.subject_name,
            topic=topic.topic_name,
            task_type="Practice",
            description=f"Additional practice: {topic.topic_name} (Weak area)",
            time_allocated_minutes=45,
            difficulty="Easy",
            mcq_count=10,
            pyq_count=3,
        )
        db.add(extra_task)

    def get_plan_analytics(
        self,
        db: Session,
        plan_id: int
    ) -> Dict:
        """
        Generate analytics for a study plan
        Shows progress, weak areas, task completion, etc.
        """
        plan = db.query(StudyPlan).filter(StudyPlan.id == plan_id).first()
        
        if not plan:
            raise ValueError("Plan not found")
        
        tasks = db.query(StudyTask).filter(StudyTask.plan_id == plan_id).all()
        completed_tasks = [t for t in tasks if t.is_completed]
        
        # Calculate metrics
        total_time_allocated = sum(t.time_allocated_minutes for t in tasks)
        total_time_spent = sum(t.actual_time_minutes or 0 for t in completed_tasks)
        completion_rate = (len(completed_tasks) / len(tasks) * 100) if tasks else 0
        
        # Identify weak areas
        weak_areas = db.query(PlanTopic).filter(
            PlanTopic.subject_id.in_(
                db.query(PlanSubject.id).filter(PlanSubject.plan_id == plan_id)
            ),
            PlanTopic.is_weak == True
        ).all()
        
        # Upcoming tasks
        today = date.today()
        upcoming_tasks = db.query(StudyTask).filter(
            StudyTask.plan_id == plan_id,
            StudyTask.task_date >= today,
            StudyTask.task_date <= today + timedelta(days=7)
        ).all()
        
        return {
            "plan_id": plan_id,
            "exam_date": plan.exam_date,
            "days_remaining": (plan.exam_date - today).days,
            "total_tasks": len(tasks),
            "completed_tasks": len(completed_tasks),
            "completion_rate": round(completion_rate, 2),
            "total_hours_allocated": round(total_time_allocated / 60, 2),
            "total_hours_spent": round(total_time_spent / 60, 2),
            "weak_areas": [
                {
                    "topic": t.topic_name,
                    "confidence": t.confidence_level,
                    "revision_count": t.revision_count
                } for t in weak_areas
            ],
            "upcoming_7_days": len(upcoming_tasks),
            "task_completion_trend": self._calculate_trend(completed_tasks, tasks),
        }

    def _calculate_trend(
        self,
        completed_tasks: List[StudyTask],
        all_tasks: List[StudyTask]
    ) -> Dict:
        """Calculate task completion trend"""
        if not all_tasks:
            return {"trend": "stable"}
        
        # Last 7 days vs previous 7 days
        today = date.today()
        recent = [t for t in completed_tasks if (today - t.completed_at.date()).days <= 7]
        previous = [t for t in completed_tasks if 7 < (today - t.completed_at.date()).days <= 14]
        
        recent_rate = len(recent) / 7
        previous_rate = len(previous) / 7 if previous else recent_rate
        
        if recent_rate > previous_rate * 1.2:
            return {"trend": "improving", "rate_change": round((recent_rate - previous_rate) / previous_rate * 100, 1)}
        elif recent_rate < previous_rate * 0.8:
            return {"trend": "declining", "rate_change": round((previous_rate - recent_rate) / previous_rate * 100, 1)}
        else:
            return {"trend": "stable"}

    def reschedule_missed_tasks(
        self,
        db: Session,
        plan_id: int
    ) -> int:
        """
        Intelligently reschedule missed tasks
        Pushes them forward without overloading
        """
        plan = db.query(StudyPlan).filter(StudyPlan.id == plan_id).first()
        
        if not plan:
            raise ValueError("Plan not found")
        
        today = date.today()
        missed_tasks = db.query(StudyTask).filter(
            StudyTask.plan_id == plan_id,
            StudyTask.task_date < today,
            StudyTask.is_completed == False
        ).all()
        
        rescheduled_count = 0
        
        for task in missed_tasks:
            # Find next available slot with fewer tasks
            new_date = today
            while new_date <= plan.exam_date:
                existing_tasks = db.query(StudyTask).filter(
                    StudyTask.plan_id == plan_id,
                    StudyTask.task_date == new_date
                ).all()
                
                total_minutes = sum(t.time_allocated_minutes for t in existing_tasks)
                
                # If day has room (less than 80% of daily hours)
                if total_minutes < (plan.daily_hours * 60 * 0.8):
                    task.task_date = new_date
                    rescheduled_count += 1
                    break
                
                new_date += timedelta(days=1)
            
            if new_date > plan.exam_date:
                # Couldn't reschedule, mark as lower priority
                task.difficulty = "Easy"
                task.time_allocated_minutes = max(15, task.time_allocated_minutes // 2)
        
        db.commit()
        return rescheduled_count
