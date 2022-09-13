import logo from './logo.svg';
import './App.css';
import List from './List';

function App() {
  return (
    <div className="App bg-dark text-light">
      <div className="container text-center">
        <h1>Shopping List</h1>
        <List></List>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </div>
    </div>
  );
}

export default App;
