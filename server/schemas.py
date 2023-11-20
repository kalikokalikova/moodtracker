from pydantic import BaseModel

# pydantic models
# validates request from client


class AuthDetails(BaseModel):
    email: str
    password: str


class MoodpointBase(BaseModel):
    label: str
    energy: int
    pleasantness: int
    user_id: int


class MoodpointModel(MoodpointBase):
    id: int

    class Config:
        orm_mode = True

# TODO is there a pydantic email validator?


class UserBase(BaseModel):
    email: str
    password: str
