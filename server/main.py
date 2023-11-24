from fastapi import FastAPI, HTTPException, Depends, status
from typing import Annotated, List
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from auth import AuthHandler
from schemas import AuthDetails, MoodpointBase, Moodpoint
import models
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
models.Base.metadata.create_all(bind=engine)
auth_handler = AuthHandler()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]


@app.post('/register', status_code=status.HTTP_201_CREATED)
async def register_user(auth_details: AuthDetails, db: db_dependency):
    existing_user = db.query(models.User).filter(models.User.email == auth_details.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail='Email already registered')
    hashed_password = auth_handler.get_password_hash(auth_details.password)
    new_user = models.User(email=auth_details.email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    token = auth_handler.encode_token(new_user.email)
    return { 'user_id': new_user.id, 'email': new_user.email, 'token': token }


@app.post('/login', response_model=dict)
def login(auth_details: AuthDetails, db: db_dependency):
    user = db.query(models.User).filter(models.User.email == auth_details.email).first()
    if user == None:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not auth_handler.verify_password(auth_details.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = auth_handler.encode_token(user.email)
    return { 'user_id': user.id, 'email': user.email, 'token': token }

# protected route
# The Depends function is used to declare a dependency on the auth_handler.auth_wrapper method.
# get_current_user won't be executed unless the dependency (authentication) is satisfied.
@app.get('/current_user')
def get_current_user(email=Depends(auth_handler.auth_wrapper)):
    # The result of the auth_handler.auth_wrapper method (the decoded email from the token) is passed as the email parameter to the get_current_user route.
    return { 'email': email }


@app.get('/users/{user_id}', status_code=status.HTTP_200_OK)
async def get_user_by_id(user_id: int, db: db_dependency):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user


@app.post('/moodpoints', response_model=Moodpoint)
async def create_moodpoint(moodpoint: MoodpointBase, db: db_dependency):
    db_moodpoint = models.Moodpoint(**moodpoint.dict())
    db.add(db_moodpoint)
    db.commit()
    db.refresh(db_moodpoint)
    return db_moodpoint


@app.get('/moodpoints', response_model=List[Moodpoint])
async def get_all_moodpoints(db: db_dependency, skip: int = 0, limit: int = 100):
    moodpoints = db.query(models.Moodpoint).offset(skip).limit(limit).all()
    return moodpoints


@app.get('/moodpoints/{user_id}', response_model=List[Moodpoint])
async def get_moodpoints_by_user(user_id: int, db: db_dependency, skip: int = 0, limit: int = 100):
    moodpoints = db.query(models.Moodpoint).filter(
        models.Moodpoint.user_id == user_id).offset(skip).limit(limit).all()
    return moodpoints


@app.delete('/moodpoints/{moodpoint_id}', status_code=status.HTTP_200_OK)
async def delete_moodpoint(moodpoint_id: int, db: db_dependency):
    db_moodpoint = db.query(models.Moodpoint).filter(
        models.Moodpoint.id == moodpoint_id).first()
    if db_moodpoint is None:
        raise HTTPException(status_code=404, detail="Moodpoint not found")
    db.delete(db_moodpoint)
    db.commit()
