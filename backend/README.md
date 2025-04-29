# Incident Report Manager Backend

This is the backend for the Incident Report Manager application, built with FastAPI, SQLAlchemy, and PostgreSQL. It provides a RESTful API for user authentication and incident management.

## Features
- User registration and JWT authentication
- Secure password hashing with Passlib (bcrypt)
- Incident CRUD operations (create, read)
- PostgreSQL database with SQLAlchemy ORM
- Pydantic models for data validation
- Environment variable support with python-dotenv

## Requirements
- Python 3.8+
- PostgreSQL

## Setup Instructions

### 1. Clone the Repository
```sh
# From your desired directory
git clone <your-repo-url>
cd Incident-Report-Manager/backend
```

### 2. Create and Activate a Virtual Environment
```sh
python -m venv venv
# Bash
source venv/Scripts/activate
# PowerShell
venv\Scripts\activate
```

### 3. Install Dependencies
```sh
pip install -r requirements.txt
```

### 4. Configure Environment Variables
Create a `.env` file in the `backend` directory:
```
DATABASE_URL=postgresql://postgres:<yourpassword>@localhost/incident_db
SECRET_KEY=<your_secret_key>
```

#### Generate a Secure Secret Key
You can generate a secure random secret key using Python:
```sh
python -c "import secrets; print(secrets.token_urlsafe(32))"
```
Copy the output and use it as your `SECRET_KEY`.

### 5. Set Up the Database
- Ensure PostgreSQL is running.
- **Check if PostgreSQL is running:**
  - **Windows (PowerShell or CMD):**
    ```sh
    netstat -ano | findstr 5432
    ```
    If you see lines with `LISTENING` on port 5432, PostgreSQL is running.
  - **Linux/macOS:**
    ```sh
    sudo systemctl status postgresql
    # or
    ps aux | grep postgres
    ```
- **Check if the database exists:**
  ```sh
  # Open the psql shell
  psql -U postgres -h localhost
  # Then, in the psql prompt:
  \l
  # Look for 'incident_db' in the list
  ```
- **Create the database if it doesn't exist:**
  ```sh
  CREATE DATABASE incident_db;
  ```

### 6. Run the Application
```sh
uvicorn app.main:app --reload
```

Visit [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) for the interactive API documentation (Swagger UI).

## API Endpoints

### Auth & Users
- `POST /register` — Register a new user
- `POST /token` — Obtain JWT token (login)
- `GET /users/me` — Get current user info (JWT required)

### Incidents
- `POST /incidents/` — Create a new incident (JWT required)
- `GET /incidents/` — List your incidents (JWT required)

## Project Structure
```
backend/
  app/
    __init__.py
    main.py
    models.py
    schemas.py
    database.py
    auth.py
  venv/
  requirements.txt
  .env
  .gitignore
  README.md
```

## Notes
- Do **not** commit your `.env` or `venv/` folders.
- The backend is ready to connect to a React frontend.

---

For any issues, please open an issue or contact the maintainer. 