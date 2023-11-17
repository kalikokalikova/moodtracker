from fastapi import FastAPI, HTTPException, Depends, status
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers = ['*']
)

# pydantic models
# validates request from client
class MoodpointBase(BaseModel):
    label: str
    energy: int
    pleasantness: int
    user_id: int

# TODO is there a pydantic email validator?
class UserBase(BaseModel):
    email: str

class MoodpointModel(MoodpointBase):
    id: int

    class Config:
        orm_mode = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@app.post('/users', status_code=status.HTTP_201_CREATED)
async def create_user(user: UserBase, db: db_dependency):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get('/users/{user_id}', status_code=status.HTTP_200_OK)
async def get_user_by_id(user_id: int, db: db_dependency):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

@app.post('/moodpoints', response_model=MoodpointModel)
async def create_moodpoint(moodpoint: MoodpointBase, db: db_dependency):
    db_moodpoint = models.Moodpoint(**moodpoint.dict())
    db.add(db_moodpoint)
    db.commit()
    db.refresh(db_moodpoint)
    return db_moodpoint

@app.get('/moodpoints', response_model=List[MoodpointModel])
async def get_all_moodpoints(db: db_dependency, skip: int=0, limit: int = 100):
    moodpoints = db.query(models.Moodpoint).offset(skip).limit(limit).all()
    return moodpoints

@app.get('/moodpoints/{user_id}', response_model=List[MoodpointModel])
async def get_moodpoints_by_user(user_id: int, db: db_dependency, skip: int=0, limit: int = 100):
    moodpoints = db.query(models.Moodpoint).filter(models.Moodpoint.user_id == user_id).offset(skip).limit(limit).all()
    return moodpoints

@app.delete('/moodpoints/{moodpoint_id}', status_code=status.HTTP_200_OK)
async def delete_moodpoint(moodpoint_id: int, db: db_dependency):
    db_moodpoint = db.query(models.Moodpoint).filter(models.Moodpoint.id == moodpoint_id).first()
    if db_moodpoint is None:
        raise HTTPException(status_code=404, detail="Moodpoint not found")
    db.delete(db_moodpoint)
    db.commit()