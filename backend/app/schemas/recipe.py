from pydantic import BaseModel, Field

class RecipeCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    author: str | None = Field(default=None, max_length=200)
    description: str | None = None
    instructions: str | None = None
    cook_time: int | None = Field(default=None, ge=0)
    cuisine: str | None = Field(default=None, max_length=80)
    difficulty: str | None = Field(default=None, max_length=20)

class RecipeOut(BaseModel):
    id: int
    title: str
    author: str | None
    description: str | None
    instructions: str | None
    cook_time: int | None
    cuisine: str | None
    difficulty: str | None

    class Config:
        from_attributes = True

class RecipeUpdate(BaseModel):
    title: str | None = Field(default=None, max_length=200)
    author: str | None = Field(default=None, max_length=200)
    description: str | None = None
    instructions: str | None = None
    cook_time: int | None = Field(default=None, ge=0)
    cuisine: str | None = Field(default=None, max_length=80)
    difficulty: str | None = Field(default=None, max_length=20)
