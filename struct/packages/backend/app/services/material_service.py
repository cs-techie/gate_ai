from typing import List, Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException, status, UploadFile
import os
from app.models import Material
from app.schemas import MaterialCreate
from app.utils.files import save_upload_file


async def upload_material(
    db: Session, 
    material_data: MaterialCreate, 
    file: UploadFile,
    admin_id: int
) -> Material:
    """Upload a new material"""
    # Save file
    file_path = await save_upload_file(file, "materials")
    
    # Create record
    material = Material(
        subject=material_data.subject,
        title=material_data.title,
        type=material_data.type or "PDF",
        description=material_data.description,
        file_path=file_path,
        uploaded_by=admin_id
    )
    db.add(material)
    db.commit()
    db.refresh(material)
    return material


def get_materials(
    db: Session,
    subject: Optional[str] = None,
    skip: int = 0,
    limit: int = 100
) -> List[Material]:
    """Get all materials with optional filtering"""
    query = db.query(Material)
    if subject:
        query = query.filter(Material.subject == subject)
    return query.order_by(Material.uploaded_at.desc()).offset(skip).limit(limit).all()


def get_material_by_id(db: Session, material_id: int) -> Material:
    """Get material by ID"""
    material = db.query(Material).filter(Material.id == material_id).first()
    if not material:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Material not found"
        )
    return material


def delete_material(db: Session, material_id: int) -> None:
    """Delete a material record and its file"""
    material = db.query(Material).filter(Material.id == material_id).first()
    if not material:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Material not found"
        )
    # Remove file from disk if it exists
    try:
        if material.file_path and os.path.exists(material.file_path):
            os.remove(material.file_path)
    except OSError:
        pass  # Don't fail the delete if the file is already gone
    db.delete(material)
    db.commit()
