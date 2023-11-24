from pydantic import BaseModel, EmailStr

# pydantic models
# validates request from client
class AuthDetails(BaseModel):
    email: EmailStr
    password: str


class MoodpointBase(BaseModel):
    label: str
    energy: int
    pleasantness: int
    user_id: int


class Moodpoint(MoodpointBase):
    id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str


class User(UserBase):
    id: int
    moodpoints: list[Moodpoint] = []
