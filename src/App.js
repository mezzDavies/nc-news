import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import ArticleList from "./components/ArticleList";
import { Route, Routes } from "react-router-dom";
import ArticlePage from "./components/ArticlePage";
import { UserContext } from "./contexts/UserContext";
import { useState } from "react";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    username: "cooljmessy",
    name: "Peter Messy",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/1/1a/MR_MESSY_4A.jpg/revision/latest/scale-to-width-down/250?cb=20170730171002",
  });
  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      <div className="App">
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/articles/:topic_slug" element={<ArticleList />} />
          <Route path="/article/:article_id" element={<ArticlePage />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
