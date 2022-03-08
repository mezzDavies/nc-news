import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import ArticleList from "./components/ArticleList";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Nav /> */}
      <ArticleList />
    </div>
  );
}

export default App;
