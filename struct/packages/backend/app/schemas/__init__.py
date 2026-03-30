from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


# ============ User Schemas ============
class UserBase(BaseModel):
    name: str
    email: EmailStr


class UserCreate(UserBase):
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(UserBase):
    id: int
    role: str
    created_at: datetime
    
    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    user_id: Optional[int] = None


# ============ Test Schemas ============
class TestBase(BaseModel):
    title: str
    subject: Optional[str] = None
    duration_minutes: int = 60


class TestCreate(TestBase):
    pass


class TestResponse(TestBase):
    id: int
    created_by: Optional[int]
    created_at: datetime
    
    class Config:
        from_attributes = True


class TestWithQuestions(TestResponse):
    questions: List["QuestionResponse"] = []


# ============ Question Schemas ============
class QuestionBase(BaseModel):
    question: str
    option1: Optional[str] = None
    option2: Optional[str] = None
    option3: Optional[str] = None
    option4: Optional[str] = None


class QuestionCreate(QuestionBase):
    test_id: int
    answer: str          # "1" / "1,3" / "42.5"
    question_type: str = "MCQ"   # MCQ | MSQ | NAT
    marks: int = 1               # 1 or 2
    section: str = "Subject"     # GA | Mathematics | Subject


class QuestionResponse(QuestionBase):
    id: int
    test_id: int
    question_type: str
    marks: int
    section: str

    class Config:
        from_attributes = True


class QuestionWithAnswer(QuestionResponse):
    answer: str


# ============ Result Schemas ============
class AnswerSubmit(BaseModel):
    question_id: int
    answer: str   # "1" / "1,3" / "42.5" / "" (unattempted)


class ResultCreate(BaseModel):
    test_id: int
    answers: List[AnswerSubmit]
    time_taken: Optional[int] = None


class ResultResponse(BaseModel):
    id: int
    user_id: int
    test_id: int
    score: float
    total: int
    negative_marks: float
    correct_count: int
    wrong_count: int
    unattempted_count: int
    ga_score: float
    math_score: float
    subject_score: float
    time_taken: Optional[int]
    taken_at: datetime

    class Config:
        from_attributes = True


class ResultWithTest(ResultResponse):
    test: TestResponse


# ============ Material Schemas ============
class MaterialBase(BaseModel):
    subject: Optional[str] = None
    title: str
    type: Optional[str] = "PDF"           # PDF / Notes / Code / PYQ
    description: Optional[str] = None


class MaterialCreate(MaterialBase):
    pass


class MaterialResponse(MaterialBase):
    id: int
    file_path: str
    uploaded_by: Optional[int]
    uploaded_at: datetime

    class Config:
        from_attributes = True


# ============ Study Planner Schemas ============
from datetime import date

class PlanTopicBase(BaseModel):
    topic_name: str
    confidence_level: int = 3  # 1-5
    is_weak: bool = False
    priority: str = "Medium"  # Low | Medium | High
    weightage_percent: float = 0.0


class PlanTopicResponse(PlanTopicBase):
    id: int
    last_studied: Optional[date]
    next_revision: Optional[date]
    revision_count: int

    class Config:
        from_attributes = True


class PlanSubjectBase(BaseModel):
    subject_name: str
    confidence_level: int = 3
    is_weak: bool = False
    time_allocated_hours: float = 0.0


class PlanSubjectCreate(PlanSubjectBase):
    topics: List[PlanTopicBase] = []


class PlanSubjectResponse(PlanSubjectBase):
    id: int
    plan_id: int
    completed_hours: float
    topics: List[PlanTopicResponse]
    created_at: datetime

    class Config:
        from_attributes = True


class StudyPlanBase(BaseModel):
    exam_date: date
    daily_hours: int  # 2-10 hours
    target_rank: Optional[int] = None
    current_level: str  # Beginner | Intermediate | Advanced
    preferred_time: str = "Flexible"
    completed_percentage: int = 0


class StudyPlanCreate(StudyPlanBase):
    subjects: List[PlanSubjectCreate]


class StudyPlanResponse(StudyPlanBase):
    id: int
    user_id: int
    total_days: int
    topics_count: int
    weak_topics_count: int
    is_active: bool
    subjects: List[PlanSubjectResponse]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class StudyTaskBase(BaseModel):
    subject: str
    topic: str
    task_type: str  # Study | Practice | Revision | Mock
    description: Optional[str]
    time_allocated_minutes: int = 30
    difficulty: str = "Medium"
    mcq_count: int = 0
    pyq_count: int = 0


class StudyTaskCreate(StudyTaskBase):
    task_date: date
    plan_id: int


class StudyTaskResponse(StudyTaskBase):
    id: int
    plan_id: int
    user_id: int
    task_date: date
    is_completed: bool
    completion_percentage: int
    actual_time_minutes: Optional[int]
    difficulty_feedback: Optional[str]
    user_notes: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class StudyTaskUpdate(BaseModel):
    is_completed: Optional[bool]
    completion_percentage: Optional[int]
    actual_time_minutes: Optional[int]
    difficulty_feedback: Optional[str]
    user_notes: Optional[str]


class MockTestScheduleBase(BaseModel):
    test_id: int
    scheduled_date: date
    test_type: str  # Sectional | Full-length
    target_score: Optional[float]


class MockTestScheduleResponse(MockTestScheduleBase):
    id: int
    plan_id: int
    actual_score: Optional[float]
    is_completed: bool
    weak_areas_identified: Optional[dict]
    created_at: datetime

    class Config:
        from_attributes = True


class StudyPlanWithTasks(StudyPlanResponse):
    tasks: List[StudyTaskResponse] = []


# Forward reference update
TestWithQuestions.model_rebuild()
