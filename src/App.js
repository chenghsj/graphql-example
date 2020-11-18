import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Reading List</h1>
      <AddBook />
      <BookList />
    </div>
  );
}

export default App;
