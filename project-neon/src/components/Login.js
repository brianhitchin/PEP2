import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoggedInScreen from './LoggedInScreen';
import { useAuth } from './AuthContext';
import TeamApi from '../apis/TeamApi';
import ManagerApi from '../apis/ManagerApi';
import "../index.css"
import { useTheme } from './ThemeContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, login } = useAuth();
  const { isAdmin, adminLogin } = useAuth();
  const {isDarkMode, toggleDarkMode } = useTheme();

  const handleSubmit = (e) => {

    e.preventDefault();

    // can fix username logic here, this is temporary. Change login logic in AuthContext.js
    if (username.trim() !== '' && password.trim() !== '') {

      // Attempt to log in

      ManagerApi.login(username, password)
          .then(token => {

            // store to localStorage
            localStorage.setItem('jwt', token)

            // Get User by its username
            ManagerApi.findUserByUsername(username)
                .then( data =>{

                  if(data.role === "ROLE_MANAGER"){
                    login();
                  }
                  else if(data.role === "ROLE_ADMIN"){
                    adminLogin();
                  }

                })
          })
          .catch(error => {
            // console.log('Login failed: ', error)
          })
    }
  };

  if (isLoggedIn) {
    return <LoggedInScreen />;
  }

  if (isAdmin) {
    // return <AdminDashboard />;
  }

  return (
    <div className="container mt-5">
      <div>
        <h1 className={`text-center ${isDarkMode ? 'text-black' : 'text-white'}`}>
          Welcome to Neon!
        </h1>
        <hr className="text-white"/>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card">

            <div className="card-header text-center text-white" style={{backgroundImage:"url('https://img.freepik.com/free-vector/abstract-neon-lights-background-design_52683-44643.jpg')"}}>
              <h2>Login</h2>
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
                    required/>
                </div>

                <br/>

                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required/>
                </div>

                <br/>

                <div className="text-center">
                  <button type="submit" className="btn btn-dark mt-2 px-5">
                    Login
                  </button>
                </div>


                {/* "Create Account" button */}


              </form>

            </div>
          </div>

            <Link to="/create">
              <button className="btn btn-light btn-create-account mt-4 float-end">
                Create Account
              </button>
            </Link>

        </div>
      </div>
    </div>
  );
};

export default Login;
