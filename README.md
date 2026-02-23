# BiteBoxd 🍽️

BiteBoxd is a Letterboxd-style recipe logging application.
Users can log recipes they cook, rate and review them, track nutritional macros, upload photos, and publish recipes to a public feed with filters.

---

## Project Status

This repository represents the **current, stable iteration** of BiteBoxd.

Earlier experimental iterations were consolidated into this clean codebase to simplify commit history, remove deprecated code paths, and prepare the project for deployment and portfolio use. All functionality present here reflects the final intended design of the application.

---

## Tech Stack

### Frontend
- React + Vite
- React Router
- Axios for API calls
- Context API for authentication

### Backend
- FastAPI (Python)
- PostgreSQL (Docker)
- SQLAlchemy 2.0
- Alembic (migrations)
- JWT authentication
- Local filesystem uploads

---

## Features

- User registration and login with JWT authentication
- Beautiful gradient landing page with smooth scrolling sections
- CRUD operations for recipes
- Public and private recipe visibility
- Ratings and reviews
- Macro tracking (calories, protein, carbs, fat)
- Recipe photo uploads
- Public recipe feed with filtering and pagination
- Rate limiting middleware
- Health check endpoint
- Responsive design (mobile & desktop)

---

## Getting Started

### Prerequisites

- **Docker Desktop** (for PostgreSQL database)
- **Python 3.11+** (for backend)
- **Node.js 18+** (for frontend)

### Quick Start Guide

Follow these steps in order to run the application:

#### 1. Start Docker Desktop

Make sure Docker Desktop is running on your machine. You can check by looking for the Docker whale icon in your menu bar/system tray.

#### 2. Start the Database

```bash
cd backend
docker-compose up -d
```

This starts a PostgreSQL container on port 5433.

#### 3. Set up Backend Environment

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in `backend/` (use `.env.example` as reference).

#### 4. Run Database Migrations

```bash
# Make sure you're in the backend directory with venv activated
alembic stamp head  # Mark migrations as complete
```

#### 5. Start the Backend Server

```bash
# In backend directory with venv activated
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be running at: `http://localhost:8000`

API Documentation: `http://localhost:8000/docs`

#### 6. Set up Frontend

Open a new terminal window:

```bash
cd frontend
npm install
```

Make sure `frontend/.env` has the correct API URL:
```
VITE_API_URL=http://127.0.0.1:8000
```

#### 7. Start the Frontend

```bash
# In frontend directory
npm run dev
```

Frontend will be running at: `http://localhost:5173`

---

## Accessing Your Account

### Creating a New Account

1. Open `http://localhost:5173` in your browser
2. Click **"Create account"** or navigate to `/register`
3. Fill in:
   - **Username** (required)
   - **Email** (required, must include `@` and domain like `.com`)
   - **Password** (required, min 8 characters, must include a letter and number)
4. The button will be disabled until all requirements are met
5. Click **"Create account"**
6. You'll be redirected to login after successful registration

### Logging In

1. Navigate to `/login` or click **"Sign in"** from the landing page
2. Enter your **email** and **password**
3. Click **"Sign In"**
4. You'll be redirected to `/recipes` (your recipes dashboard)

### Troubleshooting

If you can't register or login:

1. **Check Docker is running**: `docker ps` should show `biteboxd_db` container
2. **Check backend is running**: Visit `http://localhost:8000/health` (should return `{"status":"ok"}`)
3. **Check frontend .env**: Make sure `VITE_API_URL=http://127.0.0.1:8000` (port 8000, not 8001)
4. **Restart frontend** after changing `.env` file
5. **Check browser console** (F12) for error messages

---

## Development Notes

- Backend runs on port **8000**
- Frontend runs on port **5173**
- Database (PostgreSQL) runs on port **5433**
- Uploaded files are stored locally in `backend/uploads/`
- JWT tokens are stored in localStorage
- Password requirements are enforced on both frontend and backend

---

## Color Palette

The application uses a warm, food-inspired color scheme:
- `#A94438` - Maroon (primary)
- `#D24545` - Red (accent)
- `#E6BAA3` - Peach (light accent)
- `#E4DEBE` - Beige (background)
