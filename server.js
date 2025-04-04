const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON in request body
app.use(express.json());

//connecting to database
const dbPath = path.join(__dirname, 'memeGame.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Database connected successfully.');
    }
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

// Insert a new meme
app.post('/api/memes', (req, res) => {
    const { image } = req.body;

    // Validate input
    if (!image) {
        return res.status(400).json({ error: "Image URL is required." });
    }

    const sql = `INSERT INTO memes (image) VALUES (?)`;
    db.run(sql, [image], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, image });
    });
});

// Insert a new caption
app.post('/api/captions', (req, res) => {
    const { text, points } = req.body;

    // Validate input
    if (!text || points === undefined) {
        return res.status(400).json({ error: "Text and points are required." });
    }

    const sql = `INSERT INTO captions (text, points) VALUES (?, ?)`;
    db.run(sql, [text, points], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, text, points });
    });
});
// Link a meme to a caption
app.post('/api/meme_captions', (req, res) => {
    const { meme_id, caption_id } = req.body;

    // Validate input
    if (!meme_id || !caption_id) {
        return res.status(400).json({ error: "Meme ID and Caption ID are required." });
    }

    const sql = `INSERT INTO meme_captions (meme_id, caption_id) VALUES (?, ?)`;
    db.run(sql, [meme_id, caption_id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Meme linked with caption successfully." });
    });
});

//updating an existing item by providing all its properties except the id.

app.put('/api/memes/:id', (req, res) => {
    const memeId = req.params.id;
    const { image } = req.body;  // Expecting the "image" field only

    if (!image) {
        return res.status(400).json({ error: 'Image URL is required.' });
    }

    const query = `UPDATE memes SET image = ? WHERE id = ?`;

    db.run(query, [image, memeId], function (err) {
        if (err) {
            res.status(500).json({ error: 'Error updating meme.' });
        } else if (this.changes === 0) {
            res.status(404).json({ error: `Meme with ID ${memeId} not found.` });
        } else {
            res.status(200).json({ message: 'Meme updated successfully.' });
        }
    });
});

app.put('/api/captions/:id', (req, res) => {
    const captionId = req.params.id;
    const { text, points } = req.body;  // Expecting "text" and "points" fields

    if (!text || points === undefined) {
        return res.status(400).json({ error: 'Both text and points are required.' });
    }

    const query = `UPDATE captions SET text = ?, points = ? WHERE id = ?`;

    db.run(query, [text, points, captionId], function (err) {
        if (err) {
            res.status(500).json({ error: 'Error updating caption.' });
        } else if (this.changes === 0) {
            res.status(404).json({ error: `Caption with ID ${captionId} not found.` });
        } else {
            res.status(200).json({ message: 'Caption updated successfully.' });
        }
    });
});


// Run the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
