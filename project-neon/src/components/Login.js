import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoggedInScreen from './LoggedInScreen';
import { useAuth } from './AuthContext';
import ManagerApi from "../apis/ManagerApi";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, login } = useAuth();

  const handleSubmit = (e) => {

    e.preventDefault();

    // can fix username logic here, this is temporary. Change login logic in AuthContext.js
    if (username.trim() !== '' && password.trim() !== '') {

      // Attempt to log in
      ManagerApi.login(username, password)
          .then(token => {

            // store to localStorage
            localStorage.setItem('jwt', token)
            login();
          })
          .catch(error => {
            console.log('Login failed: ', error)
          })
    }
  };

  if (isLoggedIn) {
    return <LoggedInScreen />;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-2">
                  Login
                </button>
                {/* "Create Account" button */}
              <Link to="/create">
                <button className="btn btn-danger btn-create-account mt-2 float-end">
                  Create Account
                </button>
              </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
