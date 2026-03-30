from typing import List, Optional
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import TestCreate, TestResponse, TestWithQuestions, QuestionResponse
from app.services import test_service
from app.utils.auth import get_current_user, get_current_admin
from app.models import User

router = APIRouter(prefix="/tests", tags=["Tests"])


@router.get("", response_model=List[TestResponse])
def get_tests(
    subject: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all available tests"""
    return test_service.get_tests(db, subject=subject, skip=skip, limit=limit)


@router.post("", response_model=TestResponse, status_code=status.HTTP_201_CREATED)
def create_test(
    test_data: TestCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    """Create a new test (admin only)"""
    return test_service.create_test(db, test_data, current_user.id)


@router.get("/{test_id}", response_model=TestWithQuestions)
def get_test(
    test_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get test with questions (without answers)"""
    test = test_service.get_test_with_questions(db, test_id)
    return {
        "id": test.id,
        "title": test.title,
        "subject": test.subject,
        "duration_minutes": test.duration_minutes,
        "created_by": test.created_by,
        "created_at": test.created_at,
        "questions": [
            QuestionResponse(
                id=q.id,
                test_id=q.test_id,
                question=q.question,
                option1=q.option1,
                option2=q.option2,
                option3=q.option3,
                option4=q.option4,
                question_type=q.question_type or "MCQ",
                marks=q.marks or 1,
                section=q.section or "Subject",
            ) for q in test.questions
        ]
    }


@router.delete("/{test_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_test(
    test_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    """Delete a test (admin only)"""
    test_service.delete_test(db, test_id)
