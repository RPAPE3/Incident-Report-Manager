# Incident Report Manager

A full-stack web application for managing and tracking incident reports efficiently. Built with React, FastAPI, and PostgreSQL.

## Project Overview

This project consists of two main components:
- Frontend: A modern React application built with Vite
- Backend: A FastAPI server with PostgreSQL database

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- PostgreSQL
- npm or yarn
- pip (Python package manager)

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd Incident-Report-Manager
   ```

2. Set up the Backend:
   ```bash
   cd backend
   python -m venv venv
   # On Windows (PowerShell)
   .\venv\Scripts\activate
   # On Unix/MacOS
   source venv/bin/activate
   
   pip install -r requirements.txt
   
   # Create .env file with required environment variables
   # See backend/README.md for details
   
   # Start the backend server
   uvicorn app.main:app --reload
   ```

3. Set up the Frontend:
   ```bash
   cd frontend
   npm install
   # or
   yarn install
   
   # Create .env file with required environment variables
   # See frontend/README.md for details
   
   # Start the development server
   npm run dev
   # or
   yarn dev
   ```

4. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## Project Structure

```
Incident-Report-Manager/
├── frontend/           # React frontend application
│   ├── src/           # Source files
│   ├── public/        # Static files
│   └── README.md      # Frontend documentation
├── backend/           # FastAPI backend application
│   ├── app/          # Application code
│   ├── tests/        # Backend tests
│   └── README.md     # Backend documentation
└── README.md         # This file
```

## Features

- User authentication and authorization
- Incident report creation and management
- Real-time updates
- Responsive design
- Secure API endpoints
- Database persistence
- API documentation with Swagger UI

## Documentation

For more detailed information about each component:
- [Frontend Documentation](frontend/README.md)
- [Backend Documentation](backend/README.md)
