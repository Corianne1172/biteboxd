from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parents[2]  # backend/

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=BASE_DIR / ".env",
        extra="ignore",
    )

    ENV: str = "dev"
    DATABASE_URL: str
    JWT_SECRET: str = "dev_secret"
    JWT_ALG: str = "HS256"

    API_TITLE: str = "BiteBoxd API"
    API_VERSION: str = "0.1.0"

    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:3000"
    RATE_LIMIT_ENABLED: bool = True
    RATE_LIMIT_PER_MINUTE: int = 60

settings = Settings()
