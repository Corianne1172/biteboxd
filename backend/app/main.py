from fastapi import FastAPI, Depends
from fastapi.exceptions import RequestValidationError
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException

from sqlalchemy import text
from sqlalchemy.orm import Session

from app.db.database import engine, get_db
from app.db.base import Base
from app.models import models  # noqa
from app.routes.auth import router as auth_router
from app.routes.recipes import router as recipes_router
from app.routes.feed import router as feed_router
from app.core.config import settings
from app.core.logging import setup_logging
from app.core.errors import (
    http_exception_handler,
    validation_exception_handler,
    unhandled_exception_handler,
)
from app.middleware.rate_limit import RateLimitMiddleware

setup_logging()

app = FastAPI(title=settings.API_TITLE, version=settings.API_VERSION)

# CORS (for later frontend)
origins = [o.strip() for o in settings.CORS_ORIGINS.split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rate limiting
if settings.RATE_LIMIT_ENABLED:
    app.add_middleware(RateLimitMiddleware, max_requests_per_minute=settings.RATE_LIMIT_PER_MINUTE)

# Error handlers
app.add_exception_handler(StarletteHTTPException, http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(Exception, unhandled_exception_handler)

# Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(recipes_router)
app.include_router(feed_router)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.get("/health")
def health():
    return {"status": "ok", "env": settings.ENV}

@app.get("/db-check")
def db_check(db: Session = Depends(get_db)):
    return {"ok": bool(db.execute(text("SELECT 1")).scalar())}
