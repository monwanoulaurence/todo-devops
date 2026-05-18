const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 5000;

// PostgreSQL connection
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "tododb",
  user: process.env.DB_USER || "todouser",
  password: process.env.DB_PASSWORD || "todopass",
});

app.use(cors());
app.use(express.json());

// Init DB table
async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      completed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
  console.log("✅ Database initialized");
}

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// GET all todos
app.get("/todos", async (req, res) => {
  const result = await pool.query("SELECT * FROM todos ORDER BY created_at DESC");
  res.json(result.rows);
});

// POST create todo
app.post("/todos", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });
  const result = await pool.query(
    "INSERT INTO todos (title) VALUES ($1) RETURNING *",
    [title]
  );
  res.status(201).json(result.rows[0]);
});

// PATCH toggle todo
app.patch("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    "UPDATE todos SET completed = NOT completed WHERE id = $1 RETURNING *",
    [id]
  );
  res.json(result.rows[0]);
});

// DELETE todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM todos WHERE id = $1", [id]);
  res.status(204).send();
});

// Start server
initDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
});
