from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, SmallInteger, Float, JSON, Boolean, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False, default="student")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    results = relationship("Result", back_populates="user")
    tests_created = relationship("Test", back_populates="creator")
    materials_uploaded = relationship("Material", back_populates="uploader")
    study_plans = relationship("StudyPlan", back_populates="user")
    plan_tasks = relationship("StudyTask", back_populates="user")


class Test(Base):
    __tablename__ = "tests"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    subject = Column(String(100), index=True)
    duration_minutes = Column(Integer, nullable=False, default=60)
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    creator = relationship("User", back_populates="tests_created")
    questions = relationship("Question", back_populates="test", cascade="all, delete-orphan")
    results = relationship("Result", back_populates="test")


class Question(Base):
    __tablename__ = "questions"
    
    id = Column(Integer, primary_key=True, index=True)
    test_id = Column(Integer, ForeignKey("tests.id", ondelete="CASCADE"), nullable=False)
    question = Column(Text, nullable=False)
    option1 = Column(Text)
    option2 = Column(Text)
    option3 = Column(Text)
    option4 = Column(Text)
    answer = Column(Text, nullable=False)       # MCQ/MSQ: "1" or "1,3" ; NAT: "42.5"
    question_type = Column(String(10), nullable=False, default="MCQ")   # MCQ | MSQ | NAT
    marks = Column(Integer, nullable=False, default=1)                  # 1 or 2
    section = Column(String(30), nullable=False, default="Subject")     # GA | Mathematics | Subject
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    test = relationship("Test", back_populates="questions")


class Result(Base):
    __tablename__ = "results"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    test_id = Column(Integer, ForeignKey("tests.id", ondelete="CASCADE"), nullable=False)
    score = Column(Float)             # Final score (out of 100 for GATE)
    total = Column(Integer)           # Total possible marks
    negative_marks = Column(Float, default=0.0)   # Total negative marks deducted
    correct_count = Column(Integer, default=0)
    wrong_count = Column(Integer, default=0)
    unattempted_count = Column(Integer, default=0)
    ga_score = Column(Float, default=0.0)
    math_score = Column(Float, default=0.0)
    subject_score = Column(Float, default=0.0)
    time_taken = Column(Integer)      # seconds
    taken_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="results")
    test = relationship("Test", back_populates="results")


class Material(Base):
    __tablename__ = "materials"
    
    id = Column(Integer, primary_key=True, index=True)
    subject = Column(String(100), index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    type = Column(String(50), nullable=False, default="PDF")   # PDF / Notes / Code / PYQ
    file_path = Column(String(1024), nullable=False)
    uploaded_by = Column(Integer, ForeignKey("users.id"))
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    uploader = relationship("User", back_populates="materials_uploaded")


class StudyPlan(Base):
    """Main study plan for a user"""
    __tablename__ = "study_plans"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    exam_date = Column(Date, nullable=False)                    # Target exam date
    daily_hours = Column(SmallInteger, nullable=False)          # Hours per day
    target_rank = Column(Integer, nullable=True)                # Target all-india rank
    current_level = Column(String(20), nullable=False)          # Beginner | Intermediate | Advanced
    preferred_time = Column(String(20), default="Flexible")     # Morning | Evening | Flexible
    completed_percentage = Column(SmallInteger, default=0)      # Syllabus completed %
    
    # Statistics
    total_days = Column(Integer)                                 # Days until exam
    topics_count = Column(Integer, default=0)
    weak_topics_count = Column(Integer, default=0)
    
    # Status
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="study_plans")
    subjects = relationship("PlanSubject", back_populates="plan", cascade="all, delete-orphan")
    tasks = relationship("StudyTask", back_populates="plan", cascade="all, delete-orphan")


class PlanSubject(Base):
    """Subjects included in a study plan"""
    __tablename__ = "plan_subjects"
    
    id = Column(Integer, primary_key=True, index=True)
    plan_id = Column(Integer, ForeignKey("study_plans.id", ondelete="CASCADE"), nullable=False)
    subject_name = Column(String(100), nullable=False)          # e.g., "Data Structures"
    confidence_level = Column(SmallInteger, default=3)          # 1-5 scale
    is_weak = Column(Boolean, default=False)                    # User marked as weak
    time_allocated_hours = Column(Float, default=0)             # Total hours allocated
    completed_hours = Column(Float, default=0)                  # Hours spent so far
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    plan = relationship("StudyPlan", back_populates="subjects")
    topics = relationship("PlanTopic", back_populates="subject", cascade="all, delete-orphan")


class PlanTopic(Base):
    """Individual topics within a subject"""
    __tablename__ = "plan_topics"
    
    id = Column(Integer, primary_key=True, index=True)
    subject_id = Column(Integer, ForeignKey("plan_subjects.id", ondelete="CASCADE"), nullable=False)
    topic_name = Column(String(150), nullable=False)
    confidence_level = Column(SmallInteger, default=3)          # 1-5 scale
    is_weak = Column(Boolean, default=False)
    priority = Column(String(20), default="Medium")             # Low | Medium | High
    weightage_percent = Column(Float, default=0)                # Expected % in exam
    
    # Progress
    last_studied = Column(Date, nullable=True)
    next_revision = Column(Date, nullable=True)
    revision_count = Column(Integer, default=0)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    subject = relationship("PlanSubject", back_populates="topics")


class StudyTask(Base):
    """Daily study tasks generated by the planner"""
    __tablename__ = "study_tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    plan_id = Column(Integer, ForeignKey("study_plans.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    
    task_date = Column(Date, nullable=False)
    subject = Column(String(100), nullable=False)
    topic = Column(String(150), nullable=False)
    task_type = Column(String(30), nullable=False)              # Study | Practice | Revision | Mock
    description = Column(Text)
    time_allocated_minutes = Column(Integer, default=30)
    
    # Task details
    mcq_count = Column(Integer, default=0)                      # For practice tasks
    pyq_count = Column(Integer, default=0)
    difficulty = Column(String(20), default="Medium")           # Easy | Medium | Hard
    
    # Progress
    is_completed = Column(Boolean, default=False)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    completion_percentage = Column(SmallInteger, default=0)     # 0-100
    user_notes = Column(Text, nullable=True)
    
    # Adaptive feedback
    actual_time_minutes = Column(Integer, nullable=True)
    difficulty_feedback = Column(String(20), nullable=True)     # Easy | Medium | Hard (user felt)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    plan = relationship("StudyPlan", back_populates="tasks")
    user = relationship("User", back_populates="plan_tasks")


class MockTestSchedule(Base):
    """Scheduled mock tests in study plan"""
    __tablename__ = "mock_test_schedules"
    
    id = Column(Integer, primary_key=True, index=True)
    plan_id = Column(Integer, ForeignKey("study_plans.id", ondelete="CASCADE"), nullable=False)
    test_id = Column(Integer, ForeignKey("tests.id", ondelete="CASCADE"), nullable=False)
    
    scheduled_date = Column(Date, nullable=False)
    test_type = Column(String(30), nullable=False)              # Sectional | Full-length
    target_score = Column(Float, nullable=True)
    
    # After test
    actual_score = Column(Float, nullable=True)
    is_completed = Column(Boolean, default=False)
    weak_areas_identified = Column(JSON, nullable=True)         # {"topic": "weakness_level"}
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
