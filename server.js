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

// Get data from captions table with a specific condition (e.g. points > 2)
app.get('/captions/points-more-than-2', (req, res) => {
    // Define the condition: points greater than 2
    const condition = 'points > 2';

    // Query the database with the condition
    db.all(`SELECT * FROM captions WHERE ${condition}`, (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'There is a problem receiving data.' });
        } else {
            res.json(rows);  // Respond with the data
        }
    });
});

// API to get a specific meme by ID
app.get('/api/memes/:id', (req, res) => {
    const memeId = req.params.id;

    // SQL query to get a specific meme
    const sql = `SELECT * FROM memes WHERE id = ?`;

    db.get(sql, [memeId], (err, row) => {
        if (err) {
            res.status(500).json({ error: 'Error retrieving information from the database.' });
        } else if (row) {
            res.status(200).json(row);
        } else {
            res.status(404).json({ error: ` meme with ID ${memeId} not found` });
        }
    });
});

// Run the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
