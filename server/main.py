from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

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

# validates request from client
class MoodpointBase(BaseModel):
    label: str
    energy: int
    pleasantness: int

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

models.Base.metadata.create_all(bind=engine)

@app.post('/moodpoints', response_model=MoodpointModel)
async def create_moodpoint(moodpoint: MoodpointBase, db: db_dependency):
    db_moodpoint = models.Moodpoint(**moodpoint.dict())
    db.add(db_moodpoint)
    db.commit()
    db.refresh(db_moodpoint)
    return db_moodpoint

@app.get('/moodpoints', response_model=List[MoodpointModel])
async def read_moodpoints(db: db_dependency, skip: int=0, limit: int = 100):
    moodpoints = db.query(models.Moodpoint).offset(skip).limit(limit).all()
    return moodpoints