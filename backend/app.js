const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve React build (frontend)
app.use(express.static(path.join(__dirname, "build")));

// SQLite Database
const db = new sqlite3.Database("./portfolio.db", (err) => {
  if (err) console.error("DB error:", err);
  else console.log("✅ SQLite connected");
});

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      likes INTEGER DEFAULT 0
    )
  `);

  // Insert initial row for likes if none exists
  db.get("SELECT COUNT(*) as count FROM feedback", (err, row) => {
    if (row.count === 0) {
      db.run("INSERT INTO feedback (likes) VALUES (0)");
    }
  });
});

// Admin password
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "VivekListOfFeedback123";

// ------------------- API Routes -------------------

// Admin messages (password protected)
app.post("/api/admin/messages", (req, res) => {
  const { password } = req.body;
  if (password !== ADMIN_PASSWORD) return res.status(403).json({ error: "Unauthorized" });

  db.all("SELECT * FROM messages ORDER BY created_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json({ success: true, data: rows });
  });
});

// Save message from Contact form
app.post("/api/messages", (req, res) => {
  const { fullName, email, message } = req.body;
  if (!fullName || !email || !message) return res.status(400).json({ error: "All fields required" });

  db.run(
    "INSERT INTO messages (fullName, email, message) VALUES (?, ?, ?)",
    [fullName, email, message],
    function (err) {
      if (err) return res.status(500).json({ error: "DB error" });
      res.json({ success: true, id: this.lastID });
    }
  );
});

// Get all messages (for dashboard)
app.get("/api/messages", (req, res) => {
  db.all("SELECT * FROM messages ORDER BY created_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json({ success: true, data: rows });
  });
});

// Get likes count
app.get("/api/feedback/likes", (req, res) => {
  db.get("SELECT likes FROM feedback WHERE id = 1", (err, row) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json({ likes: row.likes });
  });
});

// Increment like
app.post("/api/feedback/like", (req, res) => {
  db.run("UPDATE feedback SET likes = likes + 1 WHERE id = 1", function (err) {
    if (err) return res.status(500).json({ error: "DB error" });

    db.get("SELECT likes FROM feedback WHERE id = 1", (err, row) => {
      if (err) return res.status(500).json({ error: "DB error" });
      res.json({ likes: row.likes });
    });
  });
});

// ------------------- Serve React frontend for all other routes -------------------
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
