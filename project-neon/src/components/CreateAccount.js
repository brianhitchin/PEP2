import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import ManagerApi from "../apis/ManagerApi";

const CreateAccount = () => {
  const history = useNavigate(); // Access the history object
  const { isLoggedIn } = useAuth();
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setAccount({
      ...account,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ACCOUNT CREATION HERE
    if (account.username.trim() !== "" && account.password.trim() !== "") {
      // Perform your account creation logic
      ManagerApi.signup(account);

      // Assuming account creation is successful
      alert("Account successfully created");

      // Redirect to the Home page
      history("/home");
    }
  };

  if (isLoggedIn) {
    // If the user is already logged in, redirect to the Home page
    history("/home");
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Create Account</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    value={account.username}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={account.password}
                    onChange={(e) => setAccount(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-2">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
