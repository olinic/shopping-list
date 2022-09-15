import './App.css';
import List from './List';

function App() {
  return (
    <div className="App bg-dark text-light">
      <div className="container text-center">
        <h1 className="mb-3">Shopping List</h1>
        <List></List>
      </div>
    </div>
  );
}

export default App;
