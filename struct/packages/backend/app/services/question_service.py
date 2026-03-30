from typing import List
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models import Question, Test
from app.schemas import QuestionCreate

VALID_TYPES = {"MCQ", "MSQ", "NAT"}
VALID_SECTIONS = {"GA", "Mathematics", "Subject"}


def add_question(db: Session, question_data: QuestionCreate) -> Question:
    """Add a GATE question to a test"""
    test = db.query(Test).filter(Test.id == question_data.test_id).first()
    if not test:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Test not found")

    qtype = question_data.question_type.upper()
    if qtype not in VALID_TYPES:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"question_type must be one of {VALID_TYPES}")

    if question_data.marks not in (1, 2):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="marks must be 1 or 2")

    # For MCQ/MSQ, options are required
    if qtype in ("MCQ", "MSQ"):
        if not all([question_data.option1, question_data.option2, question_data.option3, question_data.option4]):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="MCQ/MSQ requires all 4 options")

    question = Question(
        test_id=question_data.test_id,
        question=question_data.question,
        option1=question_data.option1,
        option2=question_data.option2,
        option3=question_data.option3,
        option4=question_data.option4,
        answer=str(question_data.answer),
        question_type=qtype,
        marks=question_data.marks,
        section=question_data.section,
    )
    db.add(question)
    db.commit()
    db.refresh(question)
    return question


def get_questions_by_test(db: Session, test_id: int) -> List[Question]:
    return db.query(Question).filter(Question.test_id == test_id).all()


def get_question_by_id(db: Session, question_id: int) -> Question:
    question = db.query(Question).filter(Question.id == question_id).first()
    if not question:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Question not found")
    return question
