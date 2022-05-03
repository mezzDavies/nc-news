import { useState, useContext } from "react";
import { addComment } from "../api";
import { UserContext } from "../contexts/UserContext";

export default function CommentAdder({ setIsNewComment, article_id }) {
  const { loggedInUser } = useContext(UserContext);
  const { username } = loggedInUser;
  const [showComms, setShowComms] = useState(false);
  const [isError, setisError] = useState(false);

  const [body, setBody] = useState("");

  const handleClick = () => {
    setShowComms((currentShow) => {
      return !currentShow;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = { body, username };
    setIsNewComment(true);

    setBody("");

    addComment(article_id, newComment).catch((err) => {
      if (err) setisError(true);
    });
  };

  if (isError)
    return (
      <div>
        <h3>Comment not posted.</h3>
      </div>
    );

  return (
    <>
      <button onClick={handleClick}>Add Comment</button>
      {showComms && (
        <>
          <div className="comment-adder-form">
            <form onSubmit={handleSubmit}>
              <textarea
                required
                value={body}
                onChange={(e) => {
                  setBody(e.target.value);
                }}
              ></textarea>
              <button>Post Comment</button>
            </form>
          </div>
          {/* <button onClick={handleClick}>
            {showComms ? "Hide Comments" : "Show Comments"}
          </button> */}
        </>
      )}
    </>
  );
}
