from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.config import settings
from app.database import engine, Base
from app.routers import auth_router, test_router, question_router, result_router, material_router, ai_router, planner_router

# Create tables
Base.metadata.create_all(bind=engine)

# Create upload directory
os.makedirs(settings.upload_dir, exist_ok=True)

app = FastAPI(
    title=settings.app_name,
    description="GATE Exam Preparation Platform API",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files for uploads
app.mount("/uploads", StaticFiles(directory=settings.upload_dir), name="uploads")

# Include routers
app.include_router(auth_router, prefix="/api")
app.include_router(test_router, prefix="/api")
app.include_router(question_router, prefix="/api")
app.include_router(result_router, prefix="/api")
app.include_router(material_router, prefix="/api")
app.include_router(ai_router, prefix="/api")
app.include_router(planner_router)


@app.get("/")
def root():
    return {
        "message": f"Welcome to {settings.app_name}",
        "docs": "/docs",
        "version": "1.0.0"
    }


@app.get("/health")
def health():
    return {"status": "healthy"}
