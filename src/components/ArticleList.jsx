import { useParams, Link, useSearchParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { fetchArticles } from "../api";
import ArticleCard from "./ArticleCard";

function ArticleList() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setisError] = useState(false);
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSelectedOrder = () => {
    if (
      searchParams.get("order") === null ||
      searchParams.get("order") === "DESC"
    ) {
      setSearchParams({
        sort_by: "created_at",
        order: "asc",
      });
    } else {
      setSearchParams({
        sort_by: sort_by ? sort_by : "created_at",
        order: "DESC",
      });
    }
  };

  const sort_by = searchParams.get("sort_by");
  const order = searchParams.get("order");

  useEffect(() => {
    console.log("remounted");
    setIsLoading(true);
    setisError(false);
    fetchArticles(topic, sort_by, order)
      .then(({ data: { articles } }) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setisError(true);
      });
  }, [topic, sort_by, order]);

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
    <>
      <p>{topic ? topic : "all topics"}</p>
      <div className="articlesList-sortbys">
        <h3
          onClick={() => {
            setSearchParams({ sort_by: "comment_count" });
          }}
        >
          💬
        </h3>
        <h3
          onClick={() => {
            setSearchParams({ sort_by: "votes" });
          }}
        >
          ✅
        </h3>
        <h3
          onClick={() => {
            setSearchParams({ sort_by: "created_at" });
          }}
        >
          📆
        </h3>

        <h3
          onClick={() => {
            handleSelectedOrder();
          }}
        >
          order
        </h3>
      </div>
      <main id="article-list">
        <ul>
          {articles.map((article) => {
            return <ArticleCard article={article} key={article.article_id} />;
          })}
        </ul>
      </main>
    </>
  );
}

export default ArticleList;
