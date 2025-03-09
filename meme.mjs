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
const meme1 = new Meme(1, "meme1.jpg", [caption1, caption2, caption3]);
const meme2 = new Meme(2, "meme2.jpg", [caption2, caption4, caption5]);

// Add meme to collection
memeCollection.add(meme1);
memeCollection.add(meme2);

console.log("Meme:");
memeCollection.getAll().forEach(meme => {
  console.log(`ID: ${meme.id}, Image: ${meme.imageUrl}, Captions: ${meme.captions.map(c => c.text).join(", ")}`);
});


console.log("\nCaptions:");
captionCollection.getAll().forEach(caption => {
  console.log(`ID: ${caption.id}, Text: ${caption.text}, Points: ${caption.points}`);
});
