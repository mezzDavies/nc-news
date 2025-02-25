import { useParams } from "react-router-dom";

import { timeDifference } from "../utils/dateStampConverter";

import { HiOutlineChatAlt2 } from "react-icons/hi";

import { useEffect, useState } from "react";
import { fetchArticle } from "../api";
import VoteAdder from "./VoteAdder";
import CommentsWrapper from "./CommentsWrapper";
import ErrorPage from "./ErrorPage";

export default function ArticlePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); //
  const { article_id } = useParams();
  const [article, setArticle] = useState({});

  const [isNewCommentCount, setIsNewCommentCount] = useState(false);

  const currentTime = Date.now();
  const articlePostedTime = Date.parse(article.created_at);
  const articlePosted = timeDifference(currentTime, articlePostedTime);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetchArticle(article_id)
      .then(({ data }) => {
        setArticle(data.article);
        setIsLoading(false);
        if (isNewCommentCount) setIsNewCommentCount(false);
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
  }, [article_id, isNewCommentCount]);

  if (error) return <ErrorPage error={error} />;
  if (isLoading) return <h2>loading...</h2>;

  return (
    <article id="single-article">
      <header>
        <p id="articlepage-article-topic">{article.topic}</p>
        <h2>{article.title}</h2>
        <h3 id="articlepage-article-author"> By {article.author}</h3>
        <p id="articlepage-article-date"> {`${articlePosted}`}</p>
        <p id="articlepage-article-comments">
          <HiOutlineChatAlt2 /> &nbsp;
          {article.comment_count}
        </p>
      </header>
      <section className="main-section">{article.body}</section>
      <footer>
        <VoteAdder
          id={article.article_id}
          author={article.author}
          votes={article.votes}
        />
        <CommentsWrapper
          setIsNewCommentCount={setIsNewCommentCount}
          article_id={article.article_id}
        />
      </footer>
    </article>
  );
}
