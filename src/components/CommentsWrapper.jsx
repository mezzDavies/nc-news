import { useState, useEffect } from "react";
import { fetchArticleComments } from "../api";
import CommentAdder from "./CommentAdder";
import CommentDeleter from "./CommentDeleter";

import { timeDifference } from "../utils/dateStampConverter";

import { HiOutlineThumbUp } from "react-icons/hi";

export default function CommentsWrapper({ article_id, setIsNewCommentCount }) {
  const [comments, setComments] = useState([]);
  const [isCommentsUpdated, setIsCommentsUpdated] = useState(false);
  const currentTime = Date.now();

  useEffect(() => {
    fetchArticleComments(article_id).then(({ data: { comments } }) => {
      setComments(comments);
      return () => {
        console.log("commentWrapper unmounted");
        isCommentsUpdated(false);
      };
    });
  }, [article_id, isCommentsUpdated]);

  return (
    <>
      <CommentAdder
        setIsCommentsUpdated={setIsCommentsUpdated}
        setIsNewCommentCount={setIsNewCommentCount}
        article_id={article_id}
      />

      <div className="comment-list">
        <h3>Comments</h3>
        {comments.map((comment) => {
          const commentPostedTime = Date.parse(comment.created_at);
          const articlePosted = timeDifference(currentTime, commentPostedTime);

          return (
            <dl key={comment.comment_id} id="comment">
              <dt>
                <h3 id="comment-author">By {comment.author}</h3>
              </dt>
              <dt id="comment-date">{`${articlePosted}`}</dt>
              <dt id="comment-body">{comment.body}</dt>
              <dt id="comment-votes">
                <HiOutlineThumbUp /> {comment.votes}
              </dt>

              <CommentDeleter
                author={comment.author}
                comment_id={comment.comment_id}
                setIsCommentsUpdated={setIsCommentsUpdated}
                setIsNewCommentCount={setIsNewCommentCount}
              />
            </dl>
          );
        })}
      </div>
    </>
  );
}
