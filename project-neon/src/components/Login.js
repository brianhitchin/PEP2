import React, { useState } from 'react';
import LoggedInScreen from './LoggedInScreen';
import { useAuth } from './AuthContext';

const Login = () => {
  // State to store login credentials and authentication status
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {isLoggedIn, login} = useAuth();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // LOG IN LOGIC HERE 
    if (username.trim() !== '' && password.trim() !== '') {
      // Update the state to indicate a successful login
      login();
    }

    // Reset form fields after submission
    setUsername('');
    setPassword('');
  };

  // Render the Dashboard component if isLoggedIn is true
  if (isLoggedIn) {
    return <LoggedInScreen />;
  }

  // Render the login form otherwise
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
