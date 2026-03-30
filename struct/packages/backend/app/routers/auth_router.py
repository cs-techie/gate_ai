from fastapi import APIRouter, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas import UserCreate, UserResponse, UserLogin, Token
from app.services import auth_service
from app.utils.auth import get_current_user, get_current_admin
from app.models import User

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/signup", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def signup(user_data: UserCreate, db: Session = Depends(get_db)):
    """Register a new user"""
    return auth_service.create_user(db, user_data)


@router.post("/login", response_model=Token)
def login(login_data: UserLogin, db: Session = Depends(get_db)):
    """Login and get access token"""
    return auth_service.authenticate_user(db, login_data)


@router.post("/token", response_model=Token)
def login_form(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """Login with form data (for OAuth2 compatibility)"""
    login_data = UserLogin(email=form_data.username, password=form_data.password)
    return auth_service.authenticate_user(db, login_data)


@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    """Get current user profile"""
    return current_user


@router.get("/users", response_model=List[UserResponse])
def get_all_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    """Get all registered users (admin only)"""
    return db.query(User).order_by(User.created_at.desc()).all()
