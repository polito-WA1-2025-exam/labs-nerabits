import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // import the Navbar
import LoginForm from "./components/LoginForm";
import GameRound from "./components/GameRound";
import GameSummary from "./components/GameSummary";
import UserProfile from "./components/UserProfile";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Add the Navbar here */}
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/play" element={<GameRound />} />
        <Route path="/game-summary" element={<GameSummary />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
