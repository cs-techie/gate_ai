from typing import List, Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models import Test, Question
from app.schemas import TestCreate


def create_test(db: Session, test_data: TestCreate, admin_id: int) -> Test:
    """Create a new test"""
    test = Test(
        title=test_data.title,
        subject=test_data.subject,
        duration_minutes=test_data.duration_minutes,
        created_by=admin_id
    )
    db.add(test)
    db.commit()
    db.refresh(test)
    return test


def get_tests(
    db: Session, 
    subject: Optional[str] = None,
    skip: int = 0, 
    limit: int = 100
) -> List[Test]:
    """Get all tests with optional filtering"""
    query = db.query(Test)
    if subject:
        query = query.filter(Test.subject == subject)
    return query.offset(skip).limit(limit).all()


def get_test_by_id(db: Session, test_id: int) -> Test:
    """Get test by ID"""
    test = db.query(Test).filter(Test.id == test_id).first()
    if not test:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Test not found"
        )
    return test


def get_test_with_questions(db: Session, test_id: int) -> Test:
    """Get test with all questions (without answers for students)"""
    test = get_test_by_id(db, test_id)
    return test


def delete_test(db: Session, test_id: int) -> None:
    """Delete a test"""
    test = get_test_by_id(db, test_id)
    db.delete(test)
    db.commit()
