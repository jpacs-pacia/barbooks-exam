# Barbooks Take-Home Test – Full Stack Developer

This is a take-home test solution for a full-stack TypeScript developer role using the following stack:

- **Backend**: Node.js, Express, SQLite
- **Frontend**: React, TypeScript, Vite
- **Testing**: Jest, Supertest
- **Configuration**: dotenv

---

## 📁 Project Structure

```
barbooks-app/
├── backend/          # Node.js + Express API
│   ├── src/
│   ├── tests/        # Integration tests
│   ├── data.db       # SQLite DB (created by seed)
│   └── .env
├── frontend/         # React app (Vite + TypeScript)
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone <your-fork-url>
cd barbooks-app
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

#### Configure environment:

Create a `.env` file in `backend/`:

```
PORT=3000
DB_PATH=./data.db
```

#### Seed the database:

```bash
npm run seed
```

#### Start the backend:

```bash
npm run dev
```

The backend server will run at:  
📡 `http://localhost:3000`

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will run at:  
🌐 `http://localhost:5173`

---

## ✅ Features

### Backend

| Endpoint           | Description                                                 |
|--------------------|-------------------------------------------------------------|
| `GET /api/summary` | Returns order summary: total revenue, median, top product   |
| `GET /api/orders`  | Lists orders with optional `product`, `limit`, `offset`     |
| `POST /api/orders` | Creates a new order with validation                         |

### Frontend

- Displays summary statistics
- Lists recent orders
- Form to add a new order
- Filter orders by product name
- Pagination controls for order listing

---

## 🧪 Testing

To run backend tests:

```bash
cd backend
npm test
```

### Included Integration Test

- `POST /api/orders`: Ensures a valid order is inserted and returned correctly
- Uses `supertest` with an in-memory SQLite instance

---

## 🛠 Tech Stack

| Layer     | Tech                |
|-----------|---------------------|
| Language  | TypeScript          |
| Backend   | Node.js + Express   |
| Database  | SQLite              |
| Frontend  | React + Vite        |
| Testing   | Jest + Supertest    |
| Config    | dotenv              |

---

## 📦 Dev Command Reference

```bash
# Backend
cd backend
npm install
npm run seed     # Initialize DB with sample data
npm run dev      # Start backend server
npm test         # Run integration tests

# Frontend
cd ../frontend
npm install
npm run dev      # Start frontend app
```

---

## 🙌 Author

**Jose Marie M. Pacia**  
JavaScript Full-Stack Developer – Take-Home Test  
📫 GitHub: [github.com/your-username](https://github.com/your-username)
