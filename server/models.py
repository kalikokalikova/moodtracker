from database import Base
from sqlalchemy import Column, Integer, String, Boolean


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(100), unique=True)


class Moodpoint(Base):
    __tablename__ = 'moodpoints'

    id = Column(Integer, primary_key=True, index=True)
    label = Column(String(256))
    energy = Column(Integer)
    pleasantness = Column(Integer)
    user_id = Column(Integer)