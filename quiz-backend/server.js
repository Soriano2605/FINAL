const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'quizdb' 
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.post('/api/results', (req, res) => {
  const { username, score, total_questions } = req.body;

  if (!username || score == null || total_questions == null) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = 'INSERT INTO results (username, score, total_questions) VALUES (?, ?, ?)';
  db.query(sql, [username, score, total_questions], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Result saved successfully', result });
  });
});

app.get('/api/results', (req, res) => {
  db.query('SELECT * FROM results ORDER BY date_taken DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


app.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.url}`);
  next();
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
