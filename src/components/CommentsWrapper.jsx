import { useState, useEffect } from "react";
import { fetchArticleComments } from "../api";
import CommentAdder from "./CommentAdder";

function CommentsWrapper({ id }) {
  const [showComms, setShowComms] = useState(false);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetchArticleComments(id).then(({ data }) => {
      setComments(data.comments);
    });
  }, [id]);

  const handleClick = () => {
    setShowComms((currentShow) => {
      return !currentShow;
    });
  };

  return (
    <>
      <button onClick={handleClick}>
        {showComms ? "Hide comments" : "Show comments"}
      </button>
      {showComms && (
        <>
          <CommentAdder id={id} />

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
          <button onClick={handleClick}>
            {showComms ? "Hide comments" : "Show comments"}
          </button>
        </>
      )}
    </>
  );
}

export default CommentsWrapper;
