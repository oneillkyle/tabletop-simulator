# Tactical Skirmish

A web-based AI-enhanced tabletop skirmish game inspired by Warhammer — featuring LLM-powered scenario generation, fog-of-war, unit abilities, achievements, and campaign progression.

---

## 🚀 Features

- Solo tactical combat with fog-of-war and line-of-sight
- Custom abilities (overwatch, healing, grenades)
- Turn-based AI opponent behavior
- Scenario generation via LLM prompts
- Save/load game state to Firebase
- Progressive Web App (PWA) support
- Cloud deployment (Firebase Hosting or Vercel)

---

## 📦 Setup

```bash
# Install dependencies
cd frontend
npm install
```

---

## 🧪 Run Locally

```bash
npm run dev
```

Then visit: [http://localhost:5173](http://localhost:5173)

---

## 🏗️ Build

```bash
npm run build
```

---

## 🌀 Deploy with Vercel

1. Push this repo to GitHub
2. Connect it to [https://vercel.com](https://vercel.com)
3. Set build command: `npm run build`
4. Set output directory: `dist`

---

## 🔥 Deploy with Firebase Hosting

```bash
npm run build
firebase login
firebase init hosting
firebase deploy
```

Make sure `firebase.json` points to `frontend/dist`

---

## 🔐 Environment Variables

Copy `.env.example` to `.env` and fill in:

```
VITE_FIREBASE_API_KEY=your_key
VITE_LLM_PROVIDER=openai or custom
...
```

---

## 📱 PWA Support

Install to your device like a native app. Offline play and auto-updates enabled.

---

## 📁 Project Structure

- `frontend/src/components/` — UI components
- `frontend/src/game/` — Game logic (turns, AI, scenarios)
- `frontend/src/utils/` — Firebase, toast, date helpers
- `frontend/src/systems/` — Gameplay mechanics (LOS, fog, abilities)

---

Made with ❤️ and LLMs
