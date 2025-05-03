from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from . import models, auth

def get_user_by_username_or_email(db: Session, username: str, email: str):
    return db.query(models.User).filter((models.User.username == username) | (models.User.email == email)).first()

def create_user(db: Session, username: str, email: str, password: str):
    hashed_password = auth.get_password_hash(password)
    new_user = models.User(username=username, email=email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def authenticate_user(db: Session, username: str, password: str):
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user or not auth.verify_password(password, user.hashed_password):
        return None
    return user

def get_user_incident_or_404(db: Session, incident_id: int, user_id: int):
    incident = db.query(models.Incident).filter(
        models.Incident.id == incident_id,
        models.Incident.owner_id == user_id
    ).first()
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    return incident

def create_incident(db: Session, incident_data: dict, user_id: int):
    db_incident = models.Incident(**incident_data, owner_id=user_id)
    db.add(db_incident)
    db.commit()
    db.refresh(db_incident)
    return db_incident

def get_user_incidents(db: Session, user_id: int, skip: int = 0, limit: int = 10):
    return db.query(models.Incident).filter(models.Incident.owner_id == user_id).offset(skip).limit(limit).all()

def update_incident(db: Session, incident_id: int, user_id: int, update_data: dict):
    db_incident = get_user_incident_or_404(db, incident_id, user_id)
    for key, value in update_data.items():
        setattr(db_incident, key, value)
    db.commit()
    db.refresh(db_incident)
    return db_incident

def delete_incident(db: Session, incident_id: int, user_id: int):
    db_incident = get_user_incident_or_404(db, incident_id, user_id)
    db.delete(db_incident)
    db.commit() 