import { useEffect, useState } from "react";
import { fetchArticles } from "../api";
import ArticleCard from "./ArticleCard";
import FilterArticles from "./ArticleFilter";

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then((res) => {
      setArticles(res.data.articles);
    });
  }, []);

  return (
    <main id="article-list">
      {/* <FilterArticles /> */}
      <ul>
        {articles.map((article) => {
          return <ArticleCard article={article} key={article.article_id} />;
        })}
      </ul>
    </main>
  );
}

export default ArticleList;
