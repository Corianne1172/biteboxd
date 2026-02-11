from pydantic import BaseModel, EmailStr, Field, field_validator

class UserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)

    @field_validator("password")
    @classmethod
    def password_policy(cls, v: str) -> str:
        if not any(c.isalpha() for c in v):
            raise ValueError("Password must include at least one letter.")
        if not any(c.isdigit() for c in v):
            raise ValueError("Password must include at least one number.")
        return v

class UserLogin(BaseModel):
    email: EmailStr
    password: str  # no strength validation on login

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
