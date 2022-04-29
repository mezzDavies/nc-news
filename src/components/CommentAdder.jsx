import { useState, useContext } from "react";
import { addComment } from "../api";
import { UserContext } from "../contexts/UserContext";

export default function CommentAdder({ setIsNewComment, id }) {
  const { loggedInUser } = useContext(UserContext);
  const { username } = loggedInUser;
  const [showComms, setShowComms] = useState(false);

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

    addComment(id, newComment).catch((err) => {
      if (err) console.log("err in from addComment >>>", err);
    });
  };

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
              <button>Submit</button>
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
