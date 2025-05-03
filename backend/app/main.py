from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from .database import engine
from . import models
from .routes import users, incidents

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Get allowed origins from environment variable or use defaults
origins = os.getenv("FRONTEND_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(users.router)
app.include_router(incidents.router) 