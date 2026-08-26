[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](#)
[![Node.js](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](#)
[![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff)](#)
[![AdonisJS](https://img.shields.io/badge/adonis-4031A9?logo=adonisjs&logoColor=white)](#)
[![Postgres](https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white)](#)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-155dfc?logo=inertia&logoColor=fff)](#)
[![Vue.js](https://img.shields.io/badge/Vue.js-35495E?logo=vuedotjs&logoColor=4FC08D)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](#)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?logo=daisyui&logoColor=fff)](#)

## Prerequisites

- Node.js ≥ 24.x
- npm ≥ 11.x
- PostgreSQL running locally

## Setup Instructions

```bash
# Clone the project
git clone https://github.com/Guillaume-SE/Codex.git
cd Codex

# Install dependencies
npm install

# Environment setup
cp .env.example .env
# (Update .env with your database credentials)

# Generate key for AdonisJS
node ace generate:key

# Set up database
node ace migration:run
node ace db:seed

# Optional: target a specific seed file
# node ace db:seed -i

# Start dev server
npm run dev
```
