import './App.css';
import CreateAccount from './components/CreateAccount';
import CreateTeam from './components/CreateTeam';
import Home from './components/Home';
import Login from './components/Login';
import TestPage from './components/TestPage';
import { useTheme } from './components/ThemeContext';
import TopNav from './components/TopNav';
import {Routes, Route} from 'react-router-dom';
import Team from "./components/Team";
import AdminDashboard from './components/AdminDashboard';
import ManageManagers from './components/ManageManagers';
import ManageTeams from './components/ManageTeams';

function App() {
  const {isDarkMode, toggleDarkMode } = useTheme();
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
            <Route path = '/team' element = {<Team/>} exact />
            <Route path = '/admin' element = {<AdminDashboard/>} exact />
            <Route path = '/admin/managers' element = {<ManageManagers/>} exact />
            <Route path = '/admin/teams' element = {<ManageTeams/>} exact />
          </Routes>
        </div>

      </header>
    </div>
  );
}

export default App;
