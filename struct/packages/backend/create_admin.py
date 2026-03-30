"""
Run this script once to create (or reset) the admin account.
Usage:
    python create_admin.py
"""
import sys
import os

# Make sure app package is importable
sys.path.insert(0, os.path.dirname(__file__))

from app.database import SessionLocal, engine, Base
from app.models import User
from app.utils.auth import get_password_hash

# ── Credentials – change these if you want ───────────────────────────────────
ADMIN_NAME     = "Admin"
ADMIN_EMAIL    = "admin@gatexpress.com"
ADMIN_PASSWORD = "Admin@1234"
# ─────────────────────────────────────────────────────────────────────────────

# Ensure all tables exist
Base.metadata.create_all(bind=engine)

db = SessionLocal()
try:
    existing = db.query(User).filter(User.email == ADMIN_EMAIL).first()
    if existing:
        # Reset password and ensure role is admin
        existing.password_hash = get_password_hash(ADMIN_PASSWORD)
        existing.role = "admin"
        db.commit()
        print(f"[OK] Admin account updated.")
    else:
        admin = User(
            name=ADMIN_NAME,
            email=ADMIN_EMAIL,
            password_hash=get_password_hash(ADMIN_PASSWORD),
            role="admin",
        )
        db.add(admin)
        db.commit()
        print(f"[OK] Admin account created.")

    print()
    print("=" * 40)
    print("  ADMIN LOGIN CREDENTIALS")
    print("=" * 40)
    print(f"  Email    : {ADMIN_EMAIL}")
    print(f"  Password : {ADMIN_PASSWORD}")
    print(f"  Role     : admin")
    print("=" * 40)
    print()
finally:
    db.close()
