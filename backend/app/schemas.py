from pydantic import BaseModel, EmailStr
from typing import List, Optional
import datetime

class IncidentBase(BaseModel):
    title: str
    description: Optional[str] = None

class IncidentCreate(IncidentBase):
    pass

class Incident(IncidentBase):
    id: int
    timestamp: datetime.datetime
    owner_id: int

    class Config:
        orm_mode = True

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