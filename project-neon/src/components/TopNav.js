import React from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";

const TopNav = () => {
  const { isLoggedIn, logout } = useAuth();

  const handleItemClick = (itemName) => {
    if (!isLoggedIn) {
      alert(`You need to log in to access ${itemName}`);
      // Prevents actions from being taken
    }
    // additional logic here if necessary
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/home">
              Home
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="http://localhost:8080/swagger-ui/index.html">
              Docs
            </Link>
          </li>

        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item logout">
            {isLoggedIn ? (
              <>
                <Link className="nav-link" to="/home" onClick={logout}>
                  Logout
                </Link>
              </>
            ) : (
              <a>

              </a>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default TopNav;
