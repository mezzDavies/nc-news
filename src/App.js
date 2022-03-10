import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import ArticleList from "./components/ArticleList";
import { Route, Routes } from "react-router-dom";
import ArticlePage from "./components/ArticlePage";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:topic_slug" element={<ArticleList />} />
        <Route path="/article/:article_id" element={<ArticlePage />} />
      </Routes>
    </div>
  );
}

export default App;
