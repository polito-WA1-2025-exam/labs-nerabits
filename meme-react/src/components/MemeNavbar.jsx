// src/components/MemeNavbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import API from '../API';

function MemeNavbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    API.logout().then(() => {
      setUser(null);
      navigate('/login');
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/play">Meme Game</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          {user && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">پروفایل</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/game-summary">خلاصه بازی</Link>
              </li>
            </>
          )}
        </ul>
        <ul className="navbar-nav ms-auto">
          {user ? (
            <li className="nav-item">
              <button className="btn btn-outline-danger" onClick={handleLogout}>خروج</button>
            </li>
          ) : (
            <li className="nav-item">
              <Link className="btn btn-outline-primary" to="/login">ورود</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default MemeNavbar;
