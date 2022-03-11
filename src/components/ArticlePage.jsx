import { useParams, Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { fetchArticle } from "../api";
import VoteAdder from "./VoteAdder";
import CommentsWrapper from "./CommentsWrapper";

function ArticlePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setisError] = useState(false);
  const { article_id } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    setIsLoading(true);
    setisError(false);
    fetchArticle(article_id)
      .then(({ data }) => {
        setArticle(data.article);
        setIsLoading(false);
      })
      .catch((err) => {
        setisError(true);
      });
  }, [article_id]);

  if (isError)
    return (
      <div>
        <h3>
          article not found <Link to="/">click here to go back home</Link>
        </h3>
      </div>
    );
  if (isLoading) return <h2>loading...</h2>;

  return (
    <article id="single-article">
      <header>
        <h2>{article.title}</h2>
        <h3 id="articlepage-article-author"> By {article.author}</h3>
        <p id="articlepage-article-date">At {article.created_at}</p>
      </header>
      <section className="main-section">{article.body}</section>
      <footer>
        <VoteAdder id={article.article_id} votes={article.votes} />
        <p id="articlepage-article-comments">
          comments {article.comment_count}
        </p>
        <CommentsWrapper
          id={article.article_id}
          // count={article.comment_count}
        />
      </footer>
    </article>
  );
}

export default ArticlePage;
