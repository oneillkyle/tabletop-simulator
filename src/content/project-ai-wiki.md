---
title: "AI‑Driven Wikipedia Search & Q&A Model"
description: "Ask anything. Get precise, AI‑powered answers instantly."
ogImage: "/images/og/og-ai-wiki.png"
---

# AI‑Driven Wikipedia Search & Q&A Model
**Tagline:** Ask anything. Get precise, AI‑powered answers instantly.

## Overview
A production‑ready **FastAPI** service that answers natural‑language questions with high precision. Queries are routed through **Elasticsearch** for fast passage retrieval; top results are fed to a transformer model for concise, context‑aware answers. Built from `/ai` and served via `/api` in the portfolio repository.

## Highlights
- Low‑latency inference via FastAPI
- **Elasticsearch** retrieval for high‑recall search
- Transformer‑based generation for concise answers
- Clean REST endpoints for search, retrieve, and answer
- Dockerized for reproducible deploys
- Frontend integration with shareable OG previews

## Tech Stack
**Python, FastAPI, Elasticsearch, Transformers (HF), Docker, Vercel (frontend)**

## Repo Structure
- **/ai** — model code, inference pipeline, prompt/runtime utils  
- **/api** — FastAPI app exposing REST endpoints

## Links
- **GitHub (portfolio repo):** https://github.com/oneillkyle/portfolio
- **Back to Projects:** [/projects](/projects)

## Screens / Assets
- OG preview: `/images/og/og-ai-wiki.png`
