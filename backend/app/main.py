from fastapi import FastAPI

from app.db.database import engine
from app.db.base import Base
from app.models import models  # IMPORTANT: imports models

app = FastAPI(title="BiteBoxd API")

Base.metadata.create_all(bind=engine)

@app.get("/health")
def health():
    return {"status": "ok"}
