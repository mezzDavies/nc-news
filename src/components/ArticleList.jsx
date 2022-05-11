import { useParams, useSearchParams } from "react-router-dom";

import { HiOutlineChatAlt2, HiOutlineThumbUp } from "react-icons/hi";
import { BsCalendar2Date } from "react-icons/bs";
import { FaSort } from "react-icons/fa";

import { useEffect, useState } from "react";
import { fetchArticles } from "../api";
import ArticleCard from "./ArticleCard";
import ErrorPage from "./ErrorPage";

function ArticleList() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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
    setIsLoading(true);
    setError(null);
    fetchArticles(topic, sort_by, order)
      .then(({ data: { articles } }) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch(
        ({
          response: {
            data: { msg },
            status,
          },
        }) => {
          setError({ status, msg });
        }
      );
  }, [topic, sort_by, order]);

  if (error) return <ErrorPage error={error} />;

  if (isLoading) return <h2>loading...</h2>;

  return (
    <>
      <div className="articlesList-topic-display">
        <p id="topic-label">topic//</p>
        <p id="topic">{topic ? topic : "all"}</p>
      </div>

      <ul className="articlesList-sortbys">
        <li>
          <button
            className="articlesList-sortbys-button"
            aria-label="sort articles by comments"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSearchParams({ sort_by: "comment_count" });
            }}
          >
            <HiOutlineChatAlt2 />
          </button>
        </li>

        <li>
          <button
            aria-label="sort articles by votes"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSearchParams({ sort_by: "votes" });
            }}
          >
            <HiOutlineThumbUp />
          </button>
        </li>
        <li>
          <button
            aria-label="sort articles by date"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSearchParams({ sort_by: "created_at" });
            }}
          >
            <BsCalendar2Date />
          </button>
        </li>

        <li>
          <button
            aria-label="sort articles ascending or descending"
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleSelectedOrder();
            }}
          >
            <FaSort />
          </button>
        </li>
      </ul>
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
