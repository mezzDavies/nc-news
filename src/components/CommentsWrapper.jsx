import { useState, useEffect } from "react";
import { fetchArticleComments } from "../api";
import CommentAdder from "./CommentAdder";
import CommentDeleter from "./CommentDeleter";

import { HiOutlineThumbUp } from "react-icons/hi";

export default function CommentsWrapper({
  article_id,
  setIsNewComment,
  isNewComment,
}) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchArticleComments(article_id).then(({ data: { comments } }) => {
      setComments(comments);
      setIsNewComment(false);
    });
  }, [article_id, isNewComment, setIsNewComment]);

  return (
    <>
      <CommentAdder setIsNewComment={setIsNewComment} article_id={article_id} />

      <div id="comment-list">
        <h3>Comments</h3>
        {comments.map((comment) => {
          const date = new Date(Date.parse(comment.created_at));

          return (
            <dl key={comment.comment_id} id="comment">
              <dt>
                <h3>By {comment.author}</h3>
              </dt>
              <dt id="comment-body">{comment.body}</dt>
              <dt id="comment-votes">
                <HiOutlineThumbUp /> {comment.votes}
              </dt>
              <dt id="comment-date">{`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}</dt>
              <CommentDeleter
                author={comment.author}
                comment_id={comment.comment_id}
                article_id={article_id}
                setIsNewComment={setIsNewComment}
              />
            </dl>
          );
        })}
      </div>
    </>
  );
}
