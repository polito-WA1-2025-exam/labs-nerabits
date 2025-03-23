const sqlite3 = require('sqlite3').verbose();

// connecting to db
const db = new sqlite3.Database('./memeGame.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Database connected:');
    }
});

db.serialize(() => {
    // Table Meme
    db.run(`CREATE TABLE IF NOT EXISTS memes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT NOT NULL
    )`);

    // Table Caption
    db.run(`CREATE TABLE IF NOT EXISTS captions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        points INTEGER NOT NULL
    )`);

    // meme_captions table for linking memes and captions
    db.run(`CREATE TABLE IF NOT EXISTS meme_captions (
        meme_id INTEGER,
        caption_id INTEGER,
        FOREIGN KEY (meme_id) REFERENCES memes(id),
        FOREIGN KEY (caption_id) REFERENCES captions(id),
        PRIMARY KEY (meme_id, caption_id)
    )`);
    
    console.log("Tables created successfully.");
});

module.exports = db;