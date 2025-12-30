from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.models import Recipe, User
from app.schemas.recipe import RecipeCreate, RecipeOut, RecipeUpdate
from app.core.deps import get_current_user

from fastapi import UploadFile, File
import os
import uuid

router = APIRouter(prefix="/recipes", tags=["recipes"])


@router.post("", response_model=RecipeOut)
def create_recipe(
    payload: RecipeCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    recipe = Recipe(
        created_by=current_user.id,
        title=payload.title,
        author=payload.author,
        description=payload.description,
        instructions=payload.instructions,
        cook_time=payload.cook_time,
        cuisine=payload.cuisine,
        difficulty=payload.difficulty,
        is_public=payload.is_public,
        calories=payload.calories,
        protein_g=payload.protein_g,
        carbs_g=payload.carbs_g,
        fat_g=payload.fat_g,
        rating=payload.rating,
        review=payload.review,
    )
    db.add(recipe)
    db.commit()
    db.refresh(recipe)
    return recipe


@router.get("", response_model=dict)
def list_my_recipes(
    limit: int = 20,
    offset: int = 0,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    limit = max(1, min(limit, 50))
    offset = max(0, offset)

    base = db.query(Recipe).filter(Recipe.created_by == current_user.id)

    total = base.count()

    items = (
        base.order_by(Recipe.id.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )

    return {
        "meta": {"limit": limit, "offset": offset, "total": total},
        "items": [RecipeOut.model_validate(r) for r in items],
    }


@router.get("/{recipe_id}", response_model=RecipeOut)
def get_recipe(
    recipe_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not recipe or recipe.created_by != current_user.id:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe


@router.put("/{recipe_id}", response_model=RecipeOut)
def update_recipe(
    recipe_id: int,
    payload: RecipeUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not recipe or recipe.created_by != current_user.id:
        raise HTTPException(status_code=404, detail="Recipe not found")

    data = payload.model_dump(exclude_unset=True)
    for k, v in data.items():
        setattr(recipe, k, v)

    db.commit()
    db.refresh(recipe)
    return recipe


@router.delete("/{recipe_id}")
def delete_recipe(
    recipe_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not recipe or recipe.created_by != current_user.id:
        raise HTTPException(status_code=404, detail="Recipe not found")

    db.delete(recipe)
    db.commit()
    return {"deleted": True}

@router.post("/{recipe_id}/photo")
def upload_recipe_photo(
    recipe_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()

    if not recipe or recipe.created_by != current_user.id:
        raise HTTPException(status_code=404, detail="Recipe not found")

    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    upload_dir = "uploads"
    os.makedirs(upload_dir, exist_ok=True)

    ext = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    filepath = os.path.join(upload_dir, filename)

    with open(filepath, "wb") as buffer:
        buffer.write(file.file.read())

    recipe.photo_url = filepath
    db.commit()

    return {"photo_url": filepath}
