from pydantic import BaseModel, EmailStr, field_validator


# ── Auth ──

class RegisterRequest(BaseModel):
    email: str
    username: str
    password: str

    @field_validator("password")
    @classmethod
    def password_min_length(cls, v: str) -> str:
        if len(v) < 6:
            raise ValueError("password SHALL be at least 6 characters")
        return v


class LoginRequest(BaseModel):
    email: str
    password: str


class RefreshRequest(BaseModel):
    refresh_token: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str | None = None
    token_type: str = "bearer"


# ── User ──

class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    avatar_url: str | None = None
    consecutive_days: int = 0
    level: int = 1

    model_config = {"from_attributes": True}


class UserCreatedResponse(BaseModel):
    id: int
    email: str
    username: str

    model_config = {"from_attributes": True}


# ── Error ──

class ErrorResponse(BaseModel):
    detail: str
