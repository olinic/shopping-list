import './App.css'
import List from './List/List';

function App() {
  return (
    <div className="App bg-dark text-light">
      <div className="container text-center">
        <h1 className="mt-4">
          <i className="fa-solid fa-file-lines"></i> Shopping List
        </h1>
        <List></List>
      </div>
    </div>
  )
}

export default App
