import React from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";

const TopNav = () => {
  const { isLoggedIn, logout } = useAuth();

  const handleItemClick = (itemName) => {
    if (!isLoggedIn) {
      alert(`You need to log in to access ${itemName}`);
      // You may choose to redirect to the login page or take other actions
    }
    // Add any other logic you want for handling the click
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
          <li className="nav-item">
            {isLoggedIn ? (
              <>
                <Link className="nav-link" to="/testpage">
                  TESTPAGE
                </Link>
              </>
            ) : (
              <a
                className="nav-link"
                href="#"
                onClick={() => handleItemClick("TESTPAGE")}
              >
                TESTPAGE
              </a>
            )}
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
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
