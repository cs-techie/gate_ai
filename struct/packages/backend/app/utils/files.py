import os
import uuid
from fastapi import UploadFile, HTTPException
from app.config import settings


def validate_file(file: UploadFile) -> str:
    """Validate file extension and return the extension"""
    if not file.filename:
        raise HTTPException(status_code=400, detail="No filename provided")
    
    ext = file.filename.rsplit(".", 1)[-1].lower()
    if ext not in settings.allowed_extensions:
        raise HTTPException(
            status_code=400, 
            detail=f"File type not allowed. Allowed: {settings.allowed_extensions}"
        )
    return ext


async def save_upload_file(file: UploadFile, subfolder: str = "materials") -> str:
    """Save uploaded file and return the file path"""
    ext = validate_file(file)
    
    # Create upload directory if not exists
    upload_path = os.path.join(settings.upload_dir, subfolder)
    os.makedirs(upload_path, exist_ok=True)
    
    # Generate unique filename
    filename = f"{uuid.uuid4()}.{ext}"
    file_path = os.path.join(upload_path, filename)
    
    # Read and validate size
    contents = await file.read()
    if len(contents) > settings.max_file_size:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Max size: {settings.max_file_size / 1024 / 1024}MB"
        )
    
    # Save file
    with open(file_path, "wb") as f:
        f.write(contents)
    
    return file_path
