import './App.css';
import Login from './components/Login';
import TopNav from './components/TopNav';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <div>
          <TopNav/>
          <Login/>
        </div>

      </header>
    </div>
  );
}

export default App;
