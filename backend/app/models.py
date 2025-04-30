from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Enum
from sqlalchemy.orm import relationship
from .database import Base
import datetime
import enum

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    incidents = relationship("Incident", back_populates="owner")

class SeverityEnum(enum.Enum):
    low = "low"
    medium = "medium"
    high = "high"
    critical = "critical"

class StatusEnum(enum.Enum):
    open = "open"
    investigating = "investigating"
    resolved = "resolved"

class Incident(Base):
    __tablename__ = "incidents"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    owner_id = Column(Integer, ForeignKey("users.id"))
    severity = Column(Enum(SeverityEnum), nullable=False, default=SeverityEnum.low)
    status = Column(Enum(StatusEnum), nullable=False, default=StatusEnum.open)
    owner = relationship("User", back_populates="incidents") 