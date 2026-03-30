"""
Study Planner API Routes
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import date
from typing import List, Optional

from app.database import get_db
from app.utils.auth import get_current_user
from app.models import User, StudyPlan, StudyTask, PlanSubject, PlanTopic
from app.schemas import (
    StudyPlanCreate, StudyPlanResponse, StudyPlanWithTasks,
    StudyTaskResponse, StudyTaskUpdate, PlanSubjectResponse
)
from app.services.planner_service import PlannerService

router = APIRouter(prefix="/api/planner", tags=["Study Planner"])
planner_service = PlannerService()


@router.post("/plans", response_model=StudyPlanResponse)
def create_study_plan(
    plan_data: StudyPlanCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Create a new personalized study plan
    
    Takes user inputs:
    - Target exam date
    - Daily study hours
    - Current level (Beginner/Intermediate/Advanced)
    - Subjects with confidence levels and weak areas
    - Target rank (optional)
    
    Returns: Study plan with auto-generated tasks
    """
    try:
        plan = planner_service.create_study_plan(db, current_user.id, plan_data)
        return plan
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/plans", response_model=List[StudyPlanResponse])
def get_user_study_plans(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all study plans for current user"""
    plans = db.query(StudyPlan).filter(
        StudyPlan.user_id == current_user.id
    ).order_by(StudyPlan.created_at.desc()).all()
    return plans


@router.get("/plans/{plan_id}", response_model=StudyPlanWithTasks)
def get_study_plan_detail(
    plan_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get detailed study plan with all tasks"""
    plan = db.query(StudyPlan).filter(
        StudyPlan.id == plan_id,
        StudyPlan.user_id == current_user.id
    ).first()
    
    if not plan:
        raise HTTPException(status_code=404, detail="Study plan not found")
    
    # Manually load tasks to ensure they're included
    tasks = db.query(StudyTask).filter(StudyTask.plan_id == plan_id).all()
    plan.tasks = tasks
    
    return plan


@router.get("/plans/{plan_id}/day", response_model=List[StudyTaskResponse])
def get_day_plan(
    plan_id: int,
    date_str: str = Query(..., description="Date in YYYY-MM-DD format"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get all tasks scheduled for a specific date
    
    Query params:
    - date_str: Target date (YYYY-MM-DD)
    
    Returns: List of tasks for that day
    """
    # Verify user owns this plan
    plan = db.query(StudyPlan).filter(
        StudyPlan.id == plan_id,
        StudyPlan.user_id == current_user.id
    ).first()
    
    if not plan:
        raise HTTPException(status_code=404, detail="Study plan not found")
    
    try:
        target_date = date.fromisoformat(date_str)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format (use YYYY-MM-DD)")
    
    tasks = planner_service.get_day_plan(db, plan_id, target_date)
    return tasks


@router.get("/plans/{plan_id}/tasks", response_model=List[StudyTaskResponse])
def get_all_plan_tasks(
    plan_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    status: Optional[str] = Query(None, description="Filter: completed, pending, all")
):
    """
    Get all tasks in a study plan with optional filtering
    
    Query params:
    - status: "completed", "pending", or "all"
    """
    plan = db.query(StudyPlan).filter(
        StudyPlan.id == plan_id,
        StudyPlan.user_id == current_user.id
    ).first()
    
    if not plan:
        raise HTTPException(status_code=404, detail="Study plan not found")
    
    query = db.query(StudyTask).filter(StudyTask.plan_id == plan_id)
    
    if status == "completed":
        query = query.filter(StudyTask.is_completed == True)
    elif status == "pending":
        query = query.filter(StudyTask.is_completed == False)
    
    tasks = query.order_by(StudyTask.task_date, StudyTask.created_at).all()
    return tasks


@router.patch("/tasks/{task_id}", response_model=StudyTaskResponse)
def update_task(
    task_id: int,
    task_update: StudyTaskUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update task progress
    
    Supports:
    - Mark complete/incomplete
    - Log actual time spent
    - Provide difficulty feedback
    - Add notes
    
    Triggers adaptive plan adjustments automatically
    """
    task = db.query(StudyTask).filter(StudyTask.id == task_id).first()
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Verify user owns this plan
    plan = db.query(StudyPlan).filter(
        StudyPlan.id == task.plan_id,
        StudyPlan.user_id == current_user.id
    ).first()
    
    if not plan:
        raise HTTPException(status_code=403, detail="Unauthorized")
    
    updated_task = planner_service.update_task_progress(
        db=db,
        task_id=task_id,
        is_completed=task_update.is_completed,
        actual_time_minutes=task_update.actual_time_minutes,
        difficulty_feedback=task_update.difficulty_feedback,
        user_notes=task_update.user_notes
    )
    
    return updated_task


@router.get("/plans/{plan_id}/analytics")
def get_plan_analytics(
    plan_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get detailed analytics for a study plan
    
    Returns:
    - Progress metrics (completion rate, hours spent)
    - Weak areas identified
    - Upcoming tasks
    - Completion trend
    - Days remaining
    """
    plan = db.query(StudyPlan).filter(
        StudyPlan.id == plan_id,
        StudyPlan.user_id == current_user.id
    ).first()
    
    if not plan:
        raise HTTPException(status_code=404, detail="Study plan not found")
    
    analytics = planner_service.get_plan_analytics(db, plan_id)
    return analytics


@router.post("/plans/{plan_id}/reschedule")
def reschedule_missed_tasks(
    plan_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Intelligently reschedule all missed tasks
    
    Distributes them across upcoming days without overloading
    
    Returns: Number of tasks rescheduled
    """
    plan = db.query(StudyPlan).filter(
        StudyPlan.id == plan_id,
        StudyPlan.user_id == current_user.id
    ).first()
    
    if not plan:
        raise HTTPException(status_code=404, detail="Study plan not found")
    
    count = planner_service.reschedule_missed_tasks(db, plan_id)
    
    return {
        "success": True,
        "rescheduled_count": count,
        "message": f"{count} missed tasks rescheduled"
    }


@router.get("/plans/{plan_id}/subjects", response_model=List[PlanSubjectResponse])
def get_plan_subjects(
    plan_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all subjects in a study plan with their topics"""
    plan = db.query(StudyPlan).filter(
        StudyPlan.id == plan_id,
        StudyPlan.user_id == current_user.id
    ).first()
    
    if not plan:
        raise HTTPException(status_code=404, detail="Study plan not found")
    
    subjects = db.query(PlanSubject).filter(
        PlanSubject.plan_id == plan_id
    ).all()
    
    return subjects


@router.patch("/plans/{plan_id}", response_model=StudyPlanResponse)
def update_study_plan(
    plan_id: int,
    update_data: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update study plan settings
    
    Can update:
    - daily_hours
    - current_level
    - completed_percentage
    - is_active (pause/resume)
    """
    plan = db.query(StudyPlan).filter(
        StudyPlan.id == plan_id,
        StudyPlan.user_id == current_user.id
    ).first()
    
    if not plan:
        raise HTTPException(status_code=404, detail="Study plan not found")
    
    # Update allowed fields
    if "daily_hours" in update_data:
        plan.daily_hours = update_data["daily_hours"]
    if "current_level" in update_data:
        plan.current_level = update_data["current_level"]
    if "completed_percentage" in update_data:
        plan.completed_percentage = update_data["completed_percentage"]
    if "is_active" in update_data:
        plan.is_active = update_data["is_active"]
    
    db.commit()
    return plan


@router.delete("/plans/{plan_id}")
def delete_study_plan(
    plan_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a study plan and all associated data"""
    plan = db.query(StudyPlan).filter(
        StudyPlan.id == plan_id,
        StudyPlan.user_id == current_user.id
    ).first()
    
    if not plan:
        raise HTTPException(status_code=404, detail="Study plan not found")
    
    db.delete(plan)
    db.commit()
    
    return {"success": True, "message": "Study plan deleted"}
