import db from './database.js';

function Meme (id, image, captions){
    this.id = id;
    this.image = image;
    this.captions = captions || [];
}

function Caption (id, text, points){
    this.id = id;
    this.text = text;
    this.points = points;
}

function Game(id) {
    this.id = id;
    this.rounds = [];
    this.score = 0;
  
    // Add a new round to the game
    this.addRound = function (meme, selectedCaption) {
      let points = 0;
      let bestCaptions = meme.captions;
  
      if (bestCaptions.some(caption => caption.text === selectedCaption.text)) {
        points = selectedCaption.points;
        this.score += points;
      }
  
      this.rounds.push({ meme: meme, selectedCaption: selectedCaption, points: points });
    };
  
    //Get total points
    this.getTotalScore = function () {
      return this.score;
    };
  }

  function Collection() {
    this.items = [];
  
    // Add new item
    this.add = function (item) {
      this.items.push(item);
    };
  
    // Find item by ID
    this.findById = function (id) {
      return this.items.find(item => item.id === id);
    };
  
    // Delete an item by ID
    this.remove = function (id) {
      this.items = this.items.filter(item => item.id !== id);
    };
  
    // Get all items
    this.getAll = function () {
      return this.items;
    };

    // Sort items by ID
    this.sortById = function () {
      this.items.sort((a, b) => a.id - b.id);
    };

    // Filter memes that have captions
    this.filterMemesWithCaptions = function () {
      return this.items.filter(meme => meme.captions.length > 0);
    };

    // Check if all memes have at least one caption
    this.allMemesHaveCaptions = function () {
      return this.items.every(meme => meme.captions.length > 0);
};
  }

// Function to add caption
  function addCaption(caption) {
  return new Promise((resolve, reject) => {
      db.run(`INSERT INTO captions (id, text, points) VALUES (?, ?, ?)`, [caption.id, caption.text, caption.points], function (err) {
          if (err) {
              reject(err);
          } else {
              resolve("Caption added successfully.");
          }
      });
  });
}

// Function to add meme
function addMeme(meme) {
  return new Promise((resolve, reject) => {
      db.run(`INSERT INTO memes (id, image) VALUES (?, ?)`, [meme.id, meme.image], function (err) {
          if (err) {
              reject(err);
          } else {
// After adding the meme, we also add the connection to the captions
            meme.captions.forEach(caption => {
                  addCaptionToMeme(meme.id, caption.id).then(resolve).catch(reject);
              });
          }
      });
  });
}

// Function to add relationship between memes and captions
function addCaptionToMeme(memeId, captionId) {
  return new Promise((resolve, reject) => {
      db.run(`INSERT INTO meme_captions (meme_id, caption_id) VALUES (?, ?)`, [memeId, captionId], function (err) {
          if (err) {
              reject(err);
          } else {
              resolve("Caption added to meme.");
          }
      });
  });
}


const memeCollection = new Collection();
const captionCollection = new Collection();

// creating captions
const caption1 = new Caption(1, "When you test the deployment directly on production ", 3);
const caption2 = new Caption(2, "When the manager says, 'It's just a small change, it'll be quick!", 2);
const caption3 = new Caption(3, "When CI/CD fails, and you have no idea why!", 1);
const caption4 = new Caption(4, "When the whole system is down, but monitoring shows no errors! ", 3);
const caption5 = new Caption(5, "When you change one script, and suddenly the entire infrastructure breaks", 2);

// Add captions to the collection
captionCollection.add(caption1);
captionCollection.add(caption2);
captionCollection.add(caption3);
captionCollection.add(caption4);
captionCollection.add(caption5);

// creating meme
const meme2 = new Meme(2, "meme2.jpg", [caption1, caption2, caption3]);
const meme1 = new Meme(1, "meme1.jpg", [caption2, caption4, caption5]);
const meme3 = new Meme(3, "meme3.jpg", [caption1, caption4, caption3]);
const meme4 = new Meme(4, "meme4.jpg", [caption1, caption4, caption2]);

// Add meme to collection
memeCollection.add(meme2);
memeCollection.add(meme1);
memeCollection.add(meme3);
memeCollection.add(meme4);

Promise.all([
  addCaption(caption1),
  addCaption(caption2),
  addCaption(caption3),
  addCaption(caption4),
  addCaption(caption5)
]).then(() => {
  // After adding captions, add the memes to the database.
  return Promise.all([
      addMeme(meme1),
      addMeme(meme2),
      addMeme(meme3),
      addMeme(meme4)
  ]);
}).then(() => {
  console.log("Memes and captions added successfully.");
}).catch(err => {
  console.error("Error adding data to database:", err);
});

// Display collections after adding new items
//console.log("Meme:");
//memeCollection.getAll().forEach(meme => {
//  console.log(`ID: ${meme.id}, Image: ${meme.image}, Captions: ${meme.captions.map(c => c.text).join(", ")}`);
//});

//console.log("\nCaptions:");
//captionCollection.getAll().forEach(caption => {
//  console.log(`ID: ${caption.id}, Text: ${caption.text}, Points: ${caption.points}`);
//});

//  Removing One Item 
//console.log("\n--- Removing Meme with ID 3 ---");
//memeCollection.remove(3);

// Check collection after removal
//console.log("\nMemes after removing Meme with ID 1:");
//memeCollection.getAll().forEach(meme => {
//    console.log(`ID: ${meme.id}, Image: ${meme.image}, Captions: ${meme.captions.map(c => c.text).join(", ")}`);
//});

// Sorting By ID
//console.log("\n--- Sorting Memes by ID ---");
//memeCollection.sortById();
//console.log("\nSorted Memes by ID:");
//memeCollection.getAll().forEach(meme => {
//    console.log(`ID: ${meme.id}, Image: ${meme.image}, Captions: ${meme.captions.map(c => c.text).join(", ")}`);
//});


// Filtering Memes With Captions ---
//console.log("\n--- Filtering Memes with Captions ---");
//const memesWithCaptions = memeCollection.filterMemesWithCaptions();
//console.log("\nMemes that have captions:");
//memesWithCaptions.forEach(meme => {
//    console.log(`ID: ${meme.id}, Image: ${meme.image}, Captions: ${meme.captions.map(c => c.text).join(", ")}`);
//});

// Check if all memes have captions
//console.log("\n--- Do all memes have captions? ---");
//console.log(memeCollection.allMemesHaveCaptions());

// Get all data from a specified table
function getAllItemsFromTable(tableName) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${tableName}`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject("Error retrieving data: " + err.message);
      } else {
        resolve(rows);
      }
    });
  });
}

//Receiving data with a specific condition
function getItemsByCondition(tableName, condition) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${tableName} WHERE ${condition}`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject("Error retrieving data: " + err.message);
      } else {
        resolve(rows);
      }
    });
  });
}

// Deleting an Item
function deleteMemeById(id) {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM memes WHERE id = ?';
    db.run(sql, [id], function(err) {
      if (err) {
        reject("Error deleting meme from database: " + err.message);
      } else if (this.changes === 0) {
        reject("Meme with ID " + id + " not found.");
      } else {
        resolve("Meme with ID " + id + " deleted successfully.");
      }
    });
  });
}

function updateCaptionById(captionId, newText) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE captions SET text = ? WHERE id = ?'; // SQL to update the 'text' of a caption with a given 'id'
    db.run(sql, [newText, captionId], function(err) {
      if (err) {
        reject("Error updating caption in database: " + err.message);
      } else if (this.changes === 0) {
        reject("Caption with ID " + captionId + " not found.");
      } else {
        resolve("Caption with ID " + captionId + " updated successfully.");
      }
    });
  });
}


// Testing the functions

//Deleting an Item
deleteMemeById(4)
  .then(message => {
    console.log("Item has been deleted"); // Confirmation message after deletion
  })
  .catch(err => {
    console.error(err); // Failure message if something goes wrong
  });

  // Test function to update the caption text for caption with ID 1
updateCaptionById(1, 'I am so funny in updating!!')
.then(message => {
  console.log("caption updated successfully"); // Confirmation: Caption updated successfully
})
.catch(err => {
  console.error(err); // Failure message if caption not found or error occurs
});


//Get all data from the memes table
getAllItemsFromTable('memes')
  .then(data => {
    console.log("All memes:", data);
  })
  .catch(err => {
    console.error(err);
  });

// Get data from captions table with specific condition (e.g. points more than 2)
getItemsByCondition('captions', 'points > 2')
  .then(data => {
    console.log("Captions with points greater than 2:", data);
  })
  .catch(err => {
    console.error(err);
  });