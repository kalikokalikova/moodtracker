from database import Base
from sqlalchemy import Column, Integer, String, Boolean

class Moodpoint(Base):
    __tablename__ = 'moodpoints'

    id = Column(Integer, primary_key=True, index=True)
    label = Column(String)
    energy = Column(Integer)
    pleasantness = Column(Integer)
