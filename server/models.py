from database import Base
from datetime import datetime
from sqlalchemy import Boolean, Column, DateTime, Integer, String, func, ForeignKey
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(100), unique=True)
    password = Column(String(100))
    updated_at = Column(DateTime, nullable=True, default=None, onupdate=datetime.now)
    created_at = Column(DateTime, nullable=False, server_default=func.now())

    moodpoints = relationship("Moodpoint", back_populates="user")


class Moodpoint(Base):
    __tablename__ = 'moodpoints'

    id = Column(Integer, primary_key=True, index=True)
    label = Column(String(256), nullable=False)
    energy = Column(Integer, nullable=False)
    pleasantness = Column(Integer, nullable=False)
    color = Column(String(32), nullable=False)
    updated_at = Column(DateTime, nullable=True, default=None, onupdate=datetime.now)
    created_at = Column(DateTime, nullable=False, server_default=func.now())
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    user = relationship("User", back_populates="moodpoints")
