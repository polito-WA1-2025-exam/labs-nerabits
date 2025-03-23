# Group "NeRaBits"

## Members
- s339794 SHAHIDZADEHASADI RANA
- s339801 MOTAHARIFAR NEGIN

# Exercise "Meme Game"

# Lab Journal

Lab02:

# Meme Game - Database Schema

##  Database Schema Overview
This project uses an SQLite database to store memes, captions, and their relationships.

### **Tables:**

1. **`memes` Table** (Stores meme images)
   - `id` (INTEGER, PRIMARY KEY, AUTOINCREMENT)  
   - `image` (TEXT, NOT NULL) → Stores the image file name or URL.

2. **`captions` Table** (Stores captions for memes)
   - `id` (INTEGER, PRIMARY KEY, AUTOINCREMENT)  
   - `text` (TEXT, NOT NULL) → Caption text.  
   - `points` (INTEGER, NOT NULL) → Score associated with the caption.

3. **`meme_captions` Table** (Joins memes and captions)
   - `meme_id` (INTEGER, FOREIGN KEY REFERENCES memes(id))  
   - `caption_id` (INTEGER, FOREIGN KEY REFERENCES captions(id))  
   - **PRIMARY KEY** (`meme_id`, `caption_id`) → Ensures unique meme-caption pairs.

### 📌 Steps to Set Up the Database
1. Install dependencies:  
   npm init -y
   npm install sqlite3

2. Run the database setup script
   node database.js

   
