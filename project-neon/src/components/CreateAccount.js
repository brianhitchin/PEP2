import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import ManagerApi from "../apis/ManagerApi";

const CreateAccount = () => {

  const history = useNavigate(); // Access the history object
  const { isLoggedIn } = useAuth();

  const [account, setAccount] = useState({
    name: "",
    username: "",
    password: "",
    managerId: -1,
    team: null,
    role: "ROLE_MANAGER",
    enabled: true
  });

  const handleChange = (event) => {
    setAccount({
      ...account,
      [event.target.name]: event.target.value,
    });
  };

  // ACCOUNT CREATION HERE
  const createAccount = (e) => {

    e.preventDefault();

    if (account.username.trim() !== "" && account.password.trim() !== "" && account.name.trim() !== "") {

      ManagerApi.doesUsernameExist(account)
          .then(usernameExists => {
            if (usernameExists) {
              console.log("Username already exists");
              alert("This username already exists.");
            } else {
              ManagerApi.createUser(account, setAccount);
              console.log("Created user " + account.username);
              alert("Account successfully created");
              history("/home");
            }
          })
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
              <form onSubmit={createAccount}>

                <div className="form-group">
                  <label htmlFor="username">Name:</label>
                  <input
                      type="text"
                      id="username"
                      className="form-control"
                      name = "name"
                      value={account.name}
                      onChange={handleChange}
                      required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    name = "username"
                    value={account.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name = "password"
                    className="form-control"
                    value={account.password}
                    onChange={handleChange}
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
