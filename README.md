# BiteBoxd 🍽️

BiteBoxd is a Letterboxd-style recipe logging application.
Users can log recipes they cook, rate and review them, track nutritional macros, upload photos, and publish recipes to a public feed with filters.

This project is built as a portfolio-grade, production-structured backend. A frontend will be added later.

---

## Tech Stack

- Backend: FastAPI (Python)
- Database: PostgreSQL (Docker)
- ORM: SQLAlchemy 2.0
- Migrations: Alembic
- Authentication: JWT (Bearer tokens)
- Uploads: Local filesystem
- API Docs: Swagger / OpenAPI

---

## Features

- User registration and login with JWT authentication
- CRUD operations for recipes
- Public and private recipe visibility
- Ratings and reviews
- Macro tracking (calories, protein, carbs, fat)
- Recipe photo uploads
- Public recipe feed with filtering and pagination
- Rate limiting middleware
- Health check endpoint
- Database constraints and indexes

---

## Local Development

### 1. Clone and set up environment

```bash
git clone <your-repo-url>
cd biteboxd/backend
python3 -m venv .venv
source .venv/bin/activate
```

### 2. Create environment file

Create a `.env` file in `backend/` using `.env.example` as a reference.

### 3. Start the database

```bash
docker compose up -d
```

### 4. Run migrations

```bash
alembic upgrade head
```

### 5. Run the API

```bash
uvicorn app.main:app --reload --port 8001
```

Swagger UI:
http://127.0.0.1:8001/docs

---

## Notes

- Uploaded files are stored locally in `backend/uploads/`
- This setup is intended for local development