# Village Game

A browser-based village-builder game. Built with TypeScript + Phaser
on the frontend, Django + SQL on the backend, as a learning project
in OOP and full-stack development.

## Status
Early development — project scaffold only, no gameplay yet.

## Tech Stack
- Frontend: TypeScript, Phaser, Vite
- Backend: Django, Django REST Framework, SQL (Postgres/SQLite)

## Setup

### Frontend
cd frontend
npm install
npm run dev

### Backend
cd backend
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver