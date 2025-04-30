import React, { useState } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import { PlusCircleFill, Trophy } from "react-bootstrap-icons";
import MemeNavbar from "./components/Navbar";
import MemeList from "./components/MemeList";
import MemeForm from "./components/MemeForm";
import "./App.css";

function App() {
  // State for memes
  const [memes, setMemes] = useState([
    {
      id: 1,
      image: 'img/savi1.jpg',
      title: 'The Pineapple Pizza Crisis',
      description: 'That moment when someone puts pineapple on pizza in your presence.',
      creator: 'Negin',
      date: new Date(2024, 3, 15),
      challenge: 'Food Controversies',
      score: 5
    },
    {
      id: 2,
      image: 'img/savi2.jpg',
      title: "Mama's Dating Detective Agency",
      description: "Your Italian mom calling for the third time in an hour to ask 'So when are you bringing this girlfriend home for Sunday dinner?'.",
      creator: 'Negin',
      date: new Date(2024, 3, 10),
      challenge: 'Family Moments',
      score: 8
    },
    {
      id: 3,
      image: 'img/savi3.jpg',
      title: 'The Italian Elevator Vogue',
      description: "When the elevator stops between floors but you're too busy channeling your inner Italian GQ model to panic.",
      creator: 'Negin',
      date: new Date(2024, 3, 5),
      challenge: 'Awkward Situations',
      score: 3
    },
  ]);

  // State for editing
  const [showForm, setShowForm] = useState(false);
  const [editingMeme, setEditingMeme] = useState(null);
  // Game state
  const [currentChallenge, setCurrentChallenge] = useState("April Fools' Day");
  const [gameMessage, setGameMessage] = useState(null);

  // Handler to toggle the form for adding a new meme
  const handleShowAddForm = () => {
    setEditingMeme(null);
    setShowForm(true);
  };

  // Handler for clicking the edit button on a meme
  const handleEditMeme = (meme) => {
    setEditingMeme(meme);
    setShowForm(true);
  };

  // Handler for canceling the form
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingMeme(null);
  };

  // Handler for saving a meme (new or edited)
  const handleSaveMeme = (memeData) => {
    if (editingMeme) {
      // Update existing meme
      setMemes(memes.map(meme => 
        meme.id === editingMeme.id ? { ...memeData, id: meme.id } : meme
      ));
      setGameMessage({
        type: 'success',
        text: 'Your meme was updated successfully!'
      });
    } else {
      // Add new meme
      const newMeme = {
        ...memeData,
        id: memes.length > 0 ? Math.max(...memes.map(m => m.id)) + 1 : 1
      };
      setMemes([...memes, newMeme]);
      setGameMessage({
        type: 'success',
        text: 'Your meme was submitted to the challenge!'
      });
    }
    
    // Hide the form after saving
    setShowForm(false);
    setEditingMeme(null);
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setGameMessage(null);
    }, 3000);
  };

  // Handler for voting on a meme
  const handleVoteMeme = (memeId) => {
    setMemes(memes.map(meme => 
      meme.id === memeId ? { ...meme, score: (meme.score || 0) + 1 } : meme
    ));
    setGameMessage({
      type: 'info',
      text: 'Vote recorded! Thanks for participating.'
    });
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setGameMessage(null);
    }, 3000);
  };

  // Get winning meme
  const getWinningMeme = () => {
    if (memes.length === 0) return null;
    return memes.reduce((prev, current) => 
      (prev.score || 0) > (current.score || 0) ? prev : current
    );
  };

  const winningMeme = getWinningMeme();

  return (
    <>
      <MemeNavbar />
      <Container className="mt-5">
        {/* Current Challenge */}
        <div className="p-4 mb-4 bg-primary text-white rounded">
          <h2 className="mb-3">
            <Trophy size={30} className="me-2" />
            Current Challenge: {currentChallenge}
          </h2>
          <p className="mb-0">
            Create and submit your funniest memes for this challenge. 
            Vote for your favorites and see who wins!
          </p>
        </div>
        
        {/* Game message */}
        {gameMessage && (
          <Alert variant={gameMessage.type} dismissible onClose={() => setGameMessage(null)}>
            {gameMessage.text}
          </Alert>
        )}
        
        {/* Current Leader */}
        {winningMeme && (
          <div className="mb-4 p-3 border rounded bg-light">
            <h4 className="mb-2">Current Leader:</h4>
            <div className="d-flex align-items-center">
              <img 
                src={winningMeme.image} 
                alt={winningMeme.title}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                className="me-3 rounded"
              />
              <div>
                <h5>{winningMeme.title} (Score: {winningMeme.score})</h5>
                <p className="mb-0">Creator: {winningMeme.creator}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Toggle button for form */}
        {!showForm && (
          <div className="d-flex justify-content-end mb-4">
            <Button variant="primary" onClick={handleShowAddForm}>
              <PlusCircleFill className="me-2" />
              Create New Meme
            </Button>
          </div>
        )}
        
        {/* Form for adding/editing memes */}
        {showForm && (
          <MemeForm 
            meme={editingMeme}
            onSave={handleSaveMeme}
            onCancel={handleCancelForm}
          />
        )}
        
        {/* List of memes */}
        <h3 className="mb-3">Current Submissions</h3>
        <MemeList 
          memes={memes} 
          onEditMeme={handleEditMeme}
          onVoteMeme={handleVoteMeme}
        />
      </Container>
    </>
  );
}

export default App;