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
  
  