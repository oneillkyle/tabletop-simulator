# Tactical Skirmish

A web-based, AI-enhanced tabletop skirmish simulator inspired by Warhammer. Built for solo play, customization, and tactical depth.

## 🚀 Features

- 🔮 AI-generated battle scenarios and advice
- 🗺️ Campaign map progression
- 🏅 Achievements + performance scoring
- 🧙 Faction + Commander selection
- 🌈 Theme selector (dark, neon, tactical)
- 🔊 Music + SFX support
- ☁️ Firebase sync for campaigns
- 📱 Fully installable PWA

## 🛠 Installation

```bash
npm install
npm run dev
```

To build for production:

```bash
npm run build
```

## 🌐 PWA

Installable on mobile or desktop with offline support. Includes a service worker and manifest.json.

## ☁️ Firebase

Add your Firebase config to `src/firebase/index.ts`. Enable Realtime Database in your Firebase console.

## 🔉 Audio

Place your `ambient.mp3` in `/public/audio/` for background music. Add more SFX as needed.

## 📦 Deployment

Deploy to Firebase Hosting or package as a desktop app using Electron.

---

© 2025 Tactical Skirmish
