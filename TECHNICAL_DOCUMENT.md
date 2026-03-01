# Technical Documentation
8Byte Portfolio Dashboard Backend

---

## 1. System Architecture

Client → Route → Controller → Service → Yahoo API → Calculation → Response

---

## 2. Layer Responsibilities

Routes:
- Define API endpoints

Controller:
- Handle request & response

Portfolio Service:
- Calculate investment
- Calculate current value
- Calculate profit/loss

Yahoo Service:
- Fetch CMP
- Handle external API errors

---

## 3. Error Handling Strategy

- Try-catch for external API
- Fallback value = 0
- Prevents server crash

---

## 4. Performance Optimization

- Promise.all used for parallel stock price fetch
- Modular architecture
- Lightweight JSON-based storage

---

## 5. Future Improvements

- Add MongoDB
- Add Redis caching
- Add authentication (JWT)
- Add rate limiting