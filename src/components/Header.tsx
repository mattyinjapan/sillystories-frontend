import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="header">
      {/* LEFT */}
      <div className="left">
        <Link to="/" className="button">
          Home
        </Link>
        {isAuthenticated ? (
          <Link
            to="/"
            className="button"
            onClick={() => logout()}
          >
            Logout
          </Link>
        ) : (
          <Link to="/login" className="button">
            Login
          </Link>
        )}
        {!isAuthenticated && (
          <Link to="/register" className="button">
            Register
          </Link>
        )}
      </div>

      {/* CENTER */}
      <div className="center">
        <h1>Silly Stories</h1>
      </div>

      {/* RIGHT */}
      <div className="right">
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {menuOpen && (
          <div className="dropdown">
            {isAuthenticated ? (
            <Link
              to="/"
              className="button"
              onClick={() => logout()}
            >
              Logout
            </Link>
            ) : (
              <Link to="/login" className="dropdownItem">
                Login
              </Link>
            )}            
             {!isAuthenticated && (
              <Link to="/register" className="dropdownItem">
                Register
              </Link>
            )}
            <Link to="/about" className="dropdownItem">
              About
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
