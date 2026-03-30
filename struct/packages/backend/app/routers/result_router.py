from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import ResultCreate, ResultResponse
from app.services import result_service
from app.utils.auth import get_current_user, get_current_admin
from app.models import User

router = APIRouter(prefix="/results", tags=["Results"])


@router.post("", response_model=ResultResponse, status_code=status.HTTP_201_CREATED)
def submit_test(
    result_data: ResultCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Submit GATE test answers and get scored result"""
    return result_service.submit_test(db, current_user.id, result_data)


@router.get("/me", response_model=List[ResultResponse])
def get_my_results(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return result_service.get_user_results(db, current_user.id)


@router.get("/user/{user_id}", response_model=List[ResultResponse])
def get_user_results(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    return result_service.get_user_results(db, user_id)


@router.get("/all", response_model=List[ResultResponse])
def get_all_results(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    return result_service.get_all_results(db, skip=skip, limit=limit)
