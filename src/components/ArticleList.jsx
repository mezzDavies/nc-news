import { useParams, Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { fetchArticles } from "../api";
import ArticleCard from "./ArticleCard";

function ArticleList() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setisError] = useState(false);
  const [articles, setArticles] = useState([]);
  const { topic_slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setisError(false);
    fetchArticles(topic_slug)
      .then((res) => {
        setArticles(res.data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setisError(true);
      });
  }, [topic_slug]);

  if (isError)
    return (
      <div>
        <h3>
          are you lost? <Link to="/">click here to go back home</Link>
        </h3>
      </div>
    );
  if (isLoading) return <h2>loading...</h2>;
  return (
    <main id="article-list">
      <ul>
        {articles.map((article) => {
          return <ArticleCard article={article} key={article.article_id} />;
        })}
      </ul>
    </main>
  );
}

export default ArticleList;
