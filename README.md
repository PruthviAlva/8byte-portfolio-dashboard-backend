# 📊 Stock Portfolio Dashboard – Backend

## 🚀 Overview
Node.js backend application that calculates stock portfolio performance using live market data from Yahoo Finance API.

---

## 🛠 Tech Stack
- Node.js
- Express.js
- Yahoo Finance API (yahoo-finance2)

---

## 📂 Folder Structure
backend/
│
├── controllers/
├── services/
├── routes/
├── data/
└── src/server.js

---

## ⚙ Installation

git clone <repo-url>
cd backend
npm install
npm start

For development with automatic restarts, use npm run dev. The API listens on
port 5000 by default; set PORT to use a different port.

---

## 📡 API Endpoint

GET /api/portfolio

Returns:
- Total Investment
- Current Value
- Profit / Loss
- Individual stock analysis

---

## 🧠 Key Features
- Live market price fetching
- Promise.all for parallel API calls
- Error handling for API failures
- Modular service architecture

---

## ⚠ Important
All NSE stocks use `.NS` suffix.