const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

//connecting to database
const dbPath = path.join(__dirname, 'memeGame.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Database connected successfully.');
    }
});

//// Server startup
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Test root
app.get('/', (req, res) => {
    res.send('Meme Game API is working');
});

// Get the list of memes
app.get('/memes', (req, res) => {
    db.all('SELECT * FROM memes', (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'There is a problem receiving data.' });
        } else {
            res.json(rows);
        }
    });
});

// Run the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
