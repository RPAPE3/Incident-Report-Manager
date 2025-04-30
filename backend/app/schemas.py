from pydantic import BaseModel, EmailStr
from typing import List, Optional
import datetime
from enum import Enum

class SeverityEnum(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"
    critical = "critical"

class StatusEnum(str, Enum):
    open = "open"
    investigating = "investigating"
    resolved = "resolved"

class IncidentBase(BaseModel):
    title: str
    description: Optional[str] = None
    severity: SeverityEnum = SeverityEnum.low
    status: StatusEnum = StatusEnum.open

class IncidentCreate(IncidentBase):
    pass

class Incident(IncidentBase):
    id: int
    timestamp: datetime.datetime
    owner_id: int

    class Config:
        orm_mode = True

class IncidentUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    severity: Optional[SeverityEnum] = None
    status: Optional[StatusEnum] = None

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    incidents: List[Incident] = []

    class Config:
        orm_mode = True 