import React, { useState } from "react";
import { Container } from "react-bootstrap";
import MemeNavbar from "./components/Navbar";
import MemeList from "./components/MemeList";
import './App.css';


function App() {
  // defing meme as state
  const [memes] = useState([
    {
      id: 1,
      image: 'img/savi1.jpg',
      title: 'The Pineapple Pizza Crisis',
      description: 'That moment when someone puts pineapple on pizza in your presence.',
      creator: 'Negin',
    },
    {
      id: 2,
      image: 'img/savi2.jpg',
      title: "Mama's Dating Detective Agency",
      description: "Your Italian mom calling for the third time in an hour to ask 'So when are you bringing this girlfriend home for Sunday dinner?'.",
      creator: 'Negin',
    },
    {
      id: 3,
      image: 'img/savi3.jpg',
      title: 'The Italian Elevator Vogue',
      description: "When the elevator stops between floors but you're too busy channeling your inner Italian GQ model to panic.",
      creator: 'Negin',
    },
  ]);

  return (
    <>
      <MemeNavbar />
      <Container className="mt-5">
        <MemeList memes={memes} />
      </Container>
    </>
  );
}

export default App;
