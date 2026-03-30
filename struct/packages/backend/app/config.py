import os
from functools import lru_cache
from dotenv import load_dotenv

# Load .env from the backend directory
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))


class Settings:
    # App
    app_name: str = "GATEXpress AI"
    debug: bool = os.getenv("DEBUG", "False").lower() == "true"
    
    # Database (using SQLite for easy setup, switch to PostgreSQL in production)
    database_url: str = os.getenv("DATABASE_URL", "sqlite:///./gatexpress.db")
    
    # JWT
    secret_key: str = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
    algorithm: str = "HS256"
    access_token_expire_minutes: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))
    
    # File Upload
    upload_dir: str = os.getenv("UPLOAD_DIR", "uploads")
    max_file_size: int = 10 * 1024 * 1024  # 10MB
    allowed_extensions: list = ["pdf", "jpg", "jpeg", "png"]


@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()
