from fastapi import APIRouter, Depends, Path, status
from sqlalchemy.orm import Session
from typing import List
from .. import schemas, database, crud, auth

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/incidents/", response_model=schemas.Incident)
def create_incident(incident: schemas.IncidentCreate, db: Session = Depends(get_db), current_user=Depends(auth.get_current_user)):
    return crud.create_incident(db, incident.dict(), current_user.id)

@router.get("/incidents/", response_model=List[schemas.Incident])
def read_incidents(skip: int = 0, limit: int = 10, db: Session = Depends(get_db), current_user=Depends(auth.get_current_user)):
    return crud.get_user_incidents(db, current_user.id, skip=skip, limit=limit)

@router.put("/incidents/{incident_id}", response_model=schemas.Incident)
def update_incident(
    incident_id: int = Path(..., description="The ID of the incident to update"),
    incident: schemas.IncidentUpdate = None,
    db: Session = Depends(get_db),
    current_user=Depends(auth.get_current_user),
):
    update_data = incident.dict(exclude_unset=True)
    return crud.update_incident(db, incident_id, current_user.id, update_data)

@router.delete("/incidents/{incident_id}", status_code=204)
def delete_incident(
    incident_id: int = Path(..., description="The ID of the incident to delete"),
    db: Session = Depends(get_db),
    current_user=Depends(auth.get_current_user),
):
    crud.delete_incident(db, incident_id, current_user.id)
    return None 