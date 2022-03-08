import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import ArticleList from "./components/ArticleList";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Nav /> */}
      <Routes>
        <Route>
          <Route path="/" element={<ArticleList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
