from fastapi import FastAPI, Depends, HTTPException, status, Path
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from . import models, schemas, database, auth
from .database import SessionLocal, engine
from typing import List

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/register", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter((models.User.username == user.username) | (models.User.email == user.email)).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username or email already registered")
    hashed_password = auth.get_password_hash(user.password)
    new_user = models.User(username=user.username, email=user.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    access_token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me", response_model=schemas.User)
def read_users_me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

@app.post("/incidents/", response_model=schemas.Incident)
def create_incident(incident: schemas.IncidentCreate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    db_incident = models.Incident(**incident.dict(), owner_id=current_user.id)
    db.add(db_incident)
    db.commit()
    db.refresh(db_incident)
    return db_incident

@app.get("/incidents/", response_model=List[schemas.Incident])
def read_incidents(skip: int = 0, limit: int = 10, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    return db.query(models.Incident).filter(models.Incident.owner_id == current_user.id).offset(skip).limit(limit).all()

@app.put("/incidents/{incident_id}", response_model=schemas.Incident)
def update_incident(
    incident_id: int = Path(..., description="The ID of the incident to update"),
    incident: schemas.IncidentUpdate = None,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    db_incident = db.query(models.Incident).filter(models.Incident.id == incident_id, models.Incident.owner_id == current_user.id).first()
    if not db_incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    update_data = incident.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_incident, key, value)
    db.commit()
    db.refresh(db_incident)
    return db_incident

@app.delete("/incidents/{incident_id}", status_code=204)
def delete_incident(
    incident_id: int = Path(..., description="The ID of the incident to delete"),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    db_incident = db.query(models.Incident).filter(models.Incident.id == incident_id, models.Incident.owner_id == current_user.id).first()
    if not db_incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    db.delete(db_incident)
    db.commit()
    return None 