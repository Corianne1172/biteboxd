from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import and_

from app.db.database import get_db
from app.models.models import Recipe
from app.schemas.recipe import RecipeOut
from app.schemas.common import Page, PageMeta

router = APIRouter(prefix="/feed", tags=["feed"])


@router.get("", response_model=dict)
def public_feed(
    q: str | None = None,
    cuisine: str | None = None,
    max_cook_time: int | None = None,
    min_rating: int | None = None,
    max_calories: int | None = None,
    min_protein: int | None = None,
    limit: int = 20,
    offset: int = 0,
    db: Session = Depends(get_db),
):
    limit = max(1, min(limit, 50))
    offset = max(0, offset)

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

    base = db.query(Recipe).filter(and_(*filters))
    total = base.count()

    items = (
        base.order_by(Recipe.id.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )

    return {
        "meta": {"limit": limit, "offset": offset, "total": total},
        "items": [RecipeOut.model_validate(x) for x in items],
    }
