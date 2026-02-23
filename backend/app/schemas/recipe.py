from pydantic import BaseModel, Field

# -------- Create --------
class RecipeCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    author: str | None = Field(default=None, max_length=200)
    description: str | None = None
    instructions: str | None = None
    cook_time: int | None = Field(default=None, ge=0)
    cuisine: str | None = Field(default=None, max_length=80)
    difficulty: str | None = Field(default=None, max_length=20)

    # new fields
    is_public: bool = False

    calories: int | None = Field(default=None, ge=0)
    protein_g: int | None = Field(default=None, ge=0)
    carbs_g: int | None = Field(default=None, ge=0)
    fat_g: int | None = Field(default=None, ge=0)

    rating: int | None = Field(default=None, ge=1, le=5)
    review: str | None = None


# -------- Update --------
class RecipeUpdate(BaseModel):
    title: str | None = Field(default=None, max_length=200)
    author: str | None = Field(default=None, max_length=200)
    description: str | None = None
    instructions: str | None = None
    cook_time: int | None = Field(default=None, ge=0)
    cuisine: str | None = Field(default=None, max_length=80)
    difficulty: str | None = Field(default=None, max_length=20)

    # new fields
    is_public: bool | None = None

    calories: int | None = Field(default=None, ge=0)
    protein_g: int | None = Field(default=None, ge=0)
    carbs_g: int | None = Field(default=None, ge=0)
    fat_g: int | None = Field(default=None, ge=0)

    rating: int | None = Field(default=None, ge=1, le=5)
    review: str | None = None


# -------- Output --------
class RecipeOut(BaseModel):
    id: int
    title: str
    author: str | None
    description: str | None
    instructions: str | None
    cook_time: int | None
    cuisine: str | None
    difficulty: str | None

    # new fields
    is_public: bool
    calories: int | None
    protein_g: int | None
    carbs_g: int | None
    fat_g: int | None
    rating: int | None
    review: str | None
    photo_url: str | None

    class Config:
        from_attributes = True
