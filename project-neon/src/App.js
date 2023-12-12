import './App.css';
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
            <Route path ='/' element ={<Login/>} exact />
            <Route path ='/home' element = {<Home/>} exact />
            <Route path = '/testpage' element = {<TestPage/>} exact />
          </Routes>
        </div>

      </header>
    </div>
  );
}

export default App;
