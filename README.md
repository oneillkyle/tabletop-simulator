# Tactical Skirmish (Monorepo)

A full-stack, AI-powered tabletop skirmish simulator for web and desktop.

## 🧠 Features
- Solo skirmishes, AI-generated scenarios
- Tactical move suggestions from LLM
- Campaign progression, factions, achievements
- Firebase sync + PWA install
- Python LLM server with OpenAI or local models

---

## 🧩 Structure

- `frontend/` — Vite-based game client
- `backend/` — Python FastAPI LLM server (Docker-ready)

---

## 🔧 Setup Instructions

### 🖥️ Frontend (Vite)

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

### 🧠 Backend (LLM Server)

```bash
cd backend
cp .env.example .env
# Run locally
uvicorn main:app --reload

# OR use Docker
docker build -t tactical-llm-server .
docker run -p 8000:8000 --env-file .env tactical-llm-server
```

---

## ☁️ Deploy

- Use [Railway](https://railway.app), [Render](https://render.com), or [Fly.io](https://fly.io) to deploy backend.
- Host frontend on [Firebase Hosting](https://firebase.google.com/docs/hosting) or Vercel.

