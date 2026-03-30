from typing import List, Optional
from fastapi import APIRouter, Depends, UploadFile, File, Form, status, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import os
from app.database import get_db
from app.schemas import MaterialResponse
from app.services import material_service
from app.utils.auth import get_current_user, get_current_admin
from app.models import User

router = APIRouter(prefix="/materials", tags=["Materials"])


@router.get("", response_model=List[MaterialResponse])
def get_materials(
    subject: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all materials"""
    return material_service.get_materials(db, subject=subject, skip=skip, limit=limit)


@router.post("", response_model=MaterialResponse, status_code=status.HTTP_201_CREATED)
async def upload_material(
    title: str = Form(...),
    subject: Optional[str] = Form(None),
    type: str = Form("PDF"),
    description: Optional[str] = Form(None),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    """Upload a new material (admin only)"""
    from app.schemas import MaterialCreate
    material_data = MaterialCreate(title=title, subject=subject, type=type, description=description)
    return await material_service.upload_material(db, material_data, file, current_user.id)


@router.get("/{material_id}")
def get_material(
    material_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Download / stream material file"""
    material = material_service.get_material_by_id(db, material_id)
    if not material:
        raise HTTPException(status_code=404, detail="Material not found")
    if os.path.exists(material.file_path):
        return FileResponse(material.file_path, filename=os.path.basename(material.file_path))
    raise HTTPException(status_code=404, detail="File not found on disk")


@router.delete("/{material_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_material(
    material_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    """Delete a material (admin only)"""
    material_service.delete_material(db, material_id)
