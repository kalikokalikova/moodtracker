import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# grab the cloud database URL if it exists, otherwise use the local configuration string
URL_DATABASE = os.environ.get("JAWSDB_URL", "mysql+pymysql://root:password@localhost:3306/moodtracker_db")

# convert standard "mysql://" connection string to "mysql+pymysql://" so SQLAlchemy uses the PyMySQL driver
if URL_DATABASE.startswith("mysql://"):
    URL_DATABASE = URL_DATABASE.replace("mysql://", "mysql+pymysql://", 1)

# fire up the engine with the dynamic URL
engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()