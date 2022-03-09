import { useParams, Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { fetchArticles } from "../api";
import ArticleCard from "./ArticleCard";
import FilterArticles from "./ArticleFilter";

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
        console.log("error >>>", err);
      });
  }, [topic_slug]);

  if (isError)
    return (
      <div>
        <h3>are you lost?</h3>
        <Link to="/">back home</Link>
      </div>
    );
  if (isLoading) return <h2>loading...</h2>;
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
