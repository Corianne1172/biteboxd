from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import and_

from app.db.database import get_db
from app.models.models import Recipe
from app.schemas.recipe import RecipeOut

router = APIRouter(prefix="/feed", tags=["feed"])


@router.get("", response_model=list[RecipeOut])
def public_feed(
    q: str | None = None,
    cuisine: str | None = None,
    max_cook_time: int | None = None,
    min_rating: int | None = None,
    max_calories: int | None = None,
    min_protein: int | None = None,
    db: Session = Depends(get_db),
):
    filters = [Recipe.is_public.is_(True)]

    if q:
        filters.append(Recipe.title.ilike(f"%{q}%"))

    if cuisine:
        filters.append(Recipe.cuisine == cuisine)

    if max_cook_time is not None:
        filters.append(Recipe.cook_time <= max_cook_time)

    if min_rating is not None:
        filters.append(Recipe.rating >= min_rating)

    if max_calories is not None:
        filters.append(Recipe.calories <= max_calories)

    if min_protein is not None:
        filters.append(Recipe.protein_g >= min_protein)

    return (
        db.query(Recipe)
        .filter(and_(*filters))
        .order_by(Recipe.id.desc())
        .limit(50)
        .all()
    )
