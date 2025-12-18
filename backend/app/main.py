from fastapi import FastAPI
from app.db.database import engine
from app.db.base import Base
from app.models import models  # noqa
from app.routes.auth import router as auth_router

app = FastAPI(title="BiteBoxd API")

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)

@app.get("/health")
def health():
    return {"status": "ok"}
