import './App.css';
import CreateAccount from './components/CreateAccount';
import CreateTeam from './components/CreateTeam';
import Home from './components/Home';
import Login from './components/Login';
import TestPage from './components/TestPage';
import TopNav from './components/TopNav';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <div>
          <TopNav/>
          <Routes>
            <Route path ='/' element ={<Home/>} exact />
            <Route path ='/home' element = {<Home/>} exact />
            <Route path = '/testpage' element = {<TestPage/>} exact />
            <Route path = '/create' element = {<CreateAccount/>} exact />
            <Route path = '/createTeam' element = {<CreateTeam/>} exact />
          </Routes>
        </div>

      </header>
    </div>
  );
}

export default App;
