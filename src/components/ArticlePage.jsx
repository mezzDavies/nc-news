import { useParams } from "react-router-dom";

import { HiOutlineChatAlt2 } from "react-icons/hi";

import { useEffect, useState } from "react";
import { fetchArticle } from "../api";
import VoteAdder from "./VoteAdder";
import CommentsWrapper from "./CommentsWrapper";
import ErrorPage from "./ErrorPage";

function ArticlePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); //
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isNewComment, setIsNewComment] = useState(false);

  const date = new Date(Date.parse(article.created_at));

  useEffect(() => {
    setIsLoading(true);
    setError(null); //
    fetchArticle(article_id)
      .then(({ data }) => {
        setArticle(data.article);
        setIsLoading(false);
        setIsNewComment(false);
      })
      .catch(
        ({
          response: {
            data: { msg },
            status,
          },
        }) => {
          setError({ status, msg });
          setIsLoading(false);
        }
      );
  }, [article_id, isNewComment]);

  if (error) return <ErrorPage error={error} />; //
  if (isLoading) return <h2>loading...</h2>;

  return (
    <article id="single-article">
      <header>
        <h2>{article.title}</h2>
        <h3 id="articlepage-article-author"> By {article.author}</h3>
        <p id="articlepage-article-date">{`At: ${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}</p>
        <p id="articlepage-article-comments">
          <HiOutlineChatAlt2 /> &nbsp;
          {article.comment_count}
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
