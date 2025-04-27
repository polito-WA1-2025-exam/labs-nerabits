import React, { useState } from "react";
import { Container } from "react-bootstrap";
import MemeNavbar from "./components/Navbar";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import MemeList from "./components/MemeList";
import Footer from "./components/Footer";
import './App.css';

function App() {
  // defining meme as state
  const [memes, setMemes] = useState([
    {
      id: 1,
      image: 'img/savi1.jpg',
      title: 'The Pineapple Pizza Crisis',
      description: 'That moment when someone puts pineapple on pizza in your presence.',
      creator: 'Negin',
      date: new Date(2024, 3, 15)
    },
    {
      id: 2,
      image: 'img/savi2.jpg',
      title: "Mama's Dating Detective Agency",
      description: "Your Italian mom calling for the third time in an hour to ask 'So when are you bringing this girlfriend home for Sunday dinner?'.",
      creator: 'Negin',
      date: new Date(2024, 3, 10)
    },
    {
      id: 3,
      image: 'img/savi3.jpg',
      title: 'The Italian Elevator Vogue',
      description: "When the elevator stops between floors but you're too busy channeling your inner Italian GQ model to panic.",
      creator: 'Negin',
      date: new Date(2024, 3, 5)
    },
  ]);

  // State for filtering/sorting (can be implemented later)
  const [sortBy, setSortBy] = useState('newest');
  const [filter, setFilter] = useState('all');

  return (
    <div className="d-flex flex-column min-vh-100">
      <MemeNavbar />
      <Header />
      <Container className="flex-grow-1">
        <FilterBar />
        <MemeList memes={memes} />
      </Container>
      <Footer />
    </div>
  );
}

export default App;