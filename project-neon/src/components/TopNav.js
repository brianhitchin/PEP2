import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import { useAdmin } from "./AdminContext";

const TopNav = () => {
  const handleLogout = () => {
    if(isAdmin)
      adminLogout()
    logout()
  }
  const { isLoggedIn, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { isAdmin, adminLogout } = useAdmin();

  const handleItemClick = (itemName) => {
    if (!isLoggedIn) {
      alert(`You need to log in to access ${itemName}`);
      // Prevents actions from being taken
    }
    // additional logic here if necessary
  };

  const changeBodyBackgroundColor = () => {
    console.log("CHANGING COLOR");
    document.body.style.backgroundColor = isDarkMode ? "#fff" : "#21252b";
  };

  useEffect(() => {
    // Call changeBodyBackgroundColor when isDarkMode changes
    changeBodyBackgroundColor();
  }, [isDarkMode]);

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        isDarkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
    >
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
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item active">
            <Link
              className="nav-link"
              to="http://localhost:8080/swagger-ui/index.html"
              // to="http://35.164.107.214:8080/swagger-ui/index.html"
            >
              Docs
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item logout">
            {isLoggedIn ? (
              <li className="nav-item active">
                <Link className="nav-link" to="/" onClick={handleLogout}>
                  <strong>Logout</strong>
                </Link>
              </li>
            ) : (
              <>{/* Login button or other components */}</>
            )}
          </li>
          <li className="nav-item">
            <button
              className="btn btn-link nav-link"
              onClick={() => {
                toggleDarkMode();
                changeBodyBackgroundColor();
              }}
            >
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default TopNav;
