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
  const [isNewComment, setIsNewComment] = useState(false);

  const date = new Date(Date.parse(article.created_at));

  useEffect(() => {
    setIsLoading(true);
    setisError(false);
    fetchArticle(article_id)
      .then(({ data }) => {
        setArticle(data.article);
        setIsLoading(false);
        setIsNewComment(false);
      })
      .catch((err) => {
        setisError(true);
      });
  }, [article_id, isNewComment]);

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
        <p id="articlepage-article-date">{`At: ${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}</p>
        <p id="articlepage-article-comments">
          {article.comment_count} comments
        </p>
      </header>
      <section className="main-section">{article.body}</section>
      <footer>
        <VoteAdder id={article.article_id} votes={article.votes} />

        <CommentsWrapper
          article_id={article.article_id}
          setIsNewComment={setIsNewComment}
          isNewComment={isNewComment}
        />
      </footer>
    </article>
  );
}

export default ArticlePage;
