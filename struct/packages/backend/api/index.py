"""
Vercel Serverless Function Handler
This file exports the FastAPI app for Vercel deployment
"""

import sys
from pathlib import Path

# Add parent directory to path so we can import app module
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.main import app

# Export the ASGI app for Vercel serverless handler
handler = app
