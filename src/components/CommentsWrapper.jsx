import { useState, useEffect } from "react";
import { fetchArticleComments } from "../api";
import CommentAdder from "./CommentAdder";

export default function CommentsWrapper({ id, setIsNewComment, isNewComment }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchArticleComments(id).then(({ data: { comments } }) => {
      setComments(comments);
      // setIsNewComment(false);
    });
    return () => {
      setIsNewComment(false);
    };
  }, [id, isNewComment, setIsNewComment]);

  return (
    <>
      <CommentAdder setIsNewComment={setIsNewComment} id={id} />

      <div id="comment-list">
        <h3>Comments</h3>
        {comments.map((comment) => {
          return (
            <dl key={comment.comment_id} id="comment">
              <dt>
                <h3>By {comment.author}</h3>
              </dt>
              <dt id="comment-body">{comment.body}</dt>
              <dt id="comment-votes">votes: {comment.votes}</dt>
              <dt>{comment.created_at}</dt>
            </dl>
          );
        })}
      </div>
    </>
  );
}
