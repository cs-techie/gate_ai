from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import QuestionCreate, QuestionResponse, QuestionWithAnswer
from app.services import question_service
from app.utils.auth import get_current_admin, get_current_user
from app.models import User

router = APIRouter(prefix="/questions", tags=["Questions"])


@router.post("", response_model=QuestionWithAnswer, status_code=status.HTTP_201_CREATED)
def add_question(
    question_data: QuestionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    """Add a GATE question to a test (admin only)"""
    return question_service.add_question(db, question_data)


@router.get("/{test_id}", response_model=List[QuestionResponse])
def get_questions(
    test_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all questions for a test (without answers)"""
    questions = question_service.get_questions_by_test(db, test_id)
    return [
        QuestionResponse(
            id=q.id,
            test_id=q.test_id,
            question=q.question,
            option1=q.option1,
            option2=q.option2,
            option3=q.option3,
            option4=q.option4,
            question_type=q.question_type,
            marks=q.marks,
            section=q.section,
        ) for q in questions
    ]
