#### TrailBlaze — Outdoor Activity Tracker

TrailBlaze is a full-stack web application for discovering, reviewing, and sharing outdoor activity spots like skateparks, bike trails, courts, and mural walls.

## Features

- View a list of curated outdoor locations
- Submit reviews with comments and star ratings
- Browse by location type (skate, bike, court, art)
- Responsive frontend UI with TailwindCSS
- RESTful backend API using Flask + SQLAlchemy
- Image avatars and optional map feature (future)

## Tech Stack

**Frontend**
- React (Vite) + TailwindCSS + React Router

**Backend**
- Flask + SQLAlchemy + Flask-Migrate

**Database**
- SQLite (local) or PostgreSQL (Render)

**Deploy**
- Frontend: Vercel
- Backend: Render

## Data Models & Relationships

**User**
- id: primary key
- username: unique
- bio: short intro
- avatar_url: profile image
- Relationships: has many reviews

**Location**
- id: primary key
- name, address, description, type
- type: enum (skate, bike, court, art)
- Relationships: has many reviews

**Review**
- id: primary key
- rating: int (1-5)
- comment: text
- user_id: FK to User
- location_id: FK to Location
- Relationships: belongs to user and location

User 1---* Review *---1 Location

⚡ Quickstart (Local Development)

1. Clone & Install

git clone https://github.com/your-username/trailblaze-activity-tracker.git
cd trailblaze-activity-tracker

2. Backend Setup

cd server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Migrate DB
export FLASK_APP=server.app
export FLASK_ENV=development
flask db init
flask db migrate -m "init"
flask db upgrade

# Seed data
flask shell
>>> exec(open("server/seed.py").read())
>>> exit()

# Run backend
flask run --port=5050

3. Frontend Setup

# Make sure you are in the project root directory
cd ../client
npm install
npm run dev

Visit: http://localhost:5173

## 🚀 Deployment

**Frontend:**  
Deployed to Vercel: [https://trailblaze-client.vercel.app](https://trailblaze-client.vercel.app)

**Backend:**  
Deployed to Render: [https://your-trailblaze.onrender.com](https://your-trailblaze.onrender.com)

📊 API Routes (Backend)

Base URL: http://localhost:5050

| Method | Endpoint         | Description         |
|--------|------------------|---------------------|
| GET    | /locations       | List all locations  |
| GET    | /reviews         | List all reviews    |
| POST   | /reviews         | Create new review   |
| GET    | /reviews/&lt;id&gt; | Get a review by ID  |
| PATCH  | /reviews/&lt;id&gt; | Update a review      |
| DELETE | /reviews/&lt;id&gt; | Delete a review      |

🌐 Environment Variables

| Key         | Location      | Description        |
|-------------|--------------|-------------------|
| SECRET_KEY  | server/.env  | Flask app secret  |
| PORT        | Render       | Server port       |

### Future Enhancements

- Add Google Maps integration
- Allow user signup/login (JWT Auth)
- Like and bookmark locations
- Upload images for reviews/locations
-Improve on the UI/UX 
- Add more features to the backend API
- Add more routes to the frontend

### Credits

Created by [George Evans Munene]. Built with Flask, React, and TailwindCSS. Inspired by outdoor communities across the world.

