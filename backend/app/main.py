from fastapi import FastAPI
from app.db.database import engine
from app.db.base import Base
from app.models import models  # noqa
from app.routes.auth import router as auth_router
from app.routes.recipes import router as recipes_router

app = FastAPI(title="BiteBoxd API")

# Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(recipes_router)

@app.get("/health")
def health():
    return {"status": "ok"}
