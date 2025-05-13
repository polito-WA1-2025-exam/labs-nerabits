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

### Steps to Set Up the Database
1. Install dependencies:  
   npm init -y
   npm install sqlite3

2. Run the database setup script
   node database.js

# Meme Game API

## Overview
This API supports a web application that manages memes and captions. It provides endpoints for retrieving, creating, updating, and deleting memes and captions stored in an SQLite database. Data is exchanged in JSON format.

## Data Model
- **Memes**: Represents an image-based meme.
  - `id` (integer, auto-incremented)
  - `image` (string, URL to the meme image)
- **Captions**: Represents captions associated with memes.
  - `id` (integer, auto-incremented)
  - `text` (string, caption text)
  - `points` (integer, score assigned to the caption)
- **Meme_Captions**: Represents the relationship between memes and captions.
  - `meme_id` (integer, references `id` in `memes` table)
  - `caption_id` (integer, references `id` in `captions` table)

---

## API Endpoints

### Retrieve the list of all items of the main collection
#### Get all memes
**GET** `/api/memes`
Retrieves the list of all memes.

**Response:**
```json
[
  { "id": 1, "image": "https://example.com/meme1.jpg" },
  { "id": 2, "image": "https://example.com/meme2.jpg" }
]
```

---

### Retrieve a list of items with specific characteristics
#### Get captions with points > 2
**GET** `/api/captions?points_min=2`
Retrieves captions with a score greater than 2.

**Response:**
```json
[
  { "id": 1, "text": "Funny caption", "points": 3 },
  { "id": 2, "text": "Hilarious!", "points": 5 }
]
```

---

### Retrieve a specific item by ID
#### Get a meme by ID
**GET** `/api/memes/:id`
Retrieves a meme by its unique ID.

**Response:**
```json
{ "id": 1, "image": "https://example.com/meme1.jpg" }
```

**Error Response:**
```json
{ "error": "Meme with ID 5 not found" }
```

---

### Create a new item
#### Create a new meme
**POST** `/api/memes`
Creates a new meme by providing an image URL.

**Request:**
```json
{ "image": "https://example.com/meme3.jpg" }
```

**Response:**
```json
{ "id": 3, "image": "https://example.com/meme3.jpg" }
```

**Error Response:**
```json
{ "error": "Image URL is required." }
```

---

### Update an existing item
#### Update a meme
**PUT** `/api/memes/:id`
Updates an existing meme, replacing its image URL.

**Request:**
```json
{ "image": "https://example.com/new_meme.jpg" }
```

**Response:**
```json
{ "message": "Meme updated successfully." }
```

**Error Response:**
```json
{ "error": "Meme with ID 3 not found." }
```

---

### Update specific attributes of an item
#### Partially update a meme
**PATCH** `/api/memes/:id`
Updates specific attributes of a meme (only fields provided).

**Request:**
```json
{ "image": "https://example.com/updated_meme.jpg" }
```

**Response:**
```json
{ "message": "Meme updated successfully." }
```

**Error Response:**
```json
{ "error": "Meme with ID 3 not found." }
```

---

### Delete an existing item
#### Delete a meme
**DELETE** `/api/memes/:id`
Deletes a meme by its ID.

**Response:**
```json
{ "message": "Meme deleted successfully." }
```

**Error Response:**
```json
{ "error": "Meme with ID 3 not found." }
```

#### Delete a caption
**DELETE** `/api/captions/:id`
Deletes a caption by its ID.

**Response:**
```json
{ "message": "Caption deleted successfully." }
```

**Error Response:**
```json
{ "error": "Caption with ID 3 not found." }
```

---

## Running the Server
- Install dependencies: `npm install`
- Start the server: `node server.js`
- Server runs on `http://localhost:3000`

Ensure the database (`memeGame.db`) is properly initialized before running the server.




### React Application Routes

| Path            | Purpose                            | Components Rendered         |
|-----------------|-------------------------------------|-----------------------------|
| `/login`        | Login page for registered users     | `LoginForm`                 |
| `/play`         | Single game round (anonymous or registered) | `GameRound`       |
| `/game-summary` | Summary after 3 rounds (registered users) | `GameSummary`      |
| `/profile`      | View score history and past games   | `UserProfile`               |
| `*`             | Invalid URL                         | `NotFoundPage`              |

