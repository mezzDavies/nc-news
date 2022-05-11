import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { onConfirm } from "react-confirm-pro";
import { deleteComment } from "../api";

export default function CommentDeleter({
  author,
  comment_id,
  setIsNewComment,
  setIsNewCommentCount,
}) {
  const {
    loggedInUser: { username },
  } = useContext(UserContext);

  const [isDisabled, setIsDisabled] = useState(false);

  const handleDelete = (comment_id) => {
    setIsDisabled(true);
    deleteComment(comment_id)
      .then(() => {
        setIsDisabled(false);
        setIsNewCommentCount(true);
        setIsNewComment(true);
      })
      .catch((err) => {
        if (err) {
          console.log("err in commentDeleter", err);
          setIsDisabled(false);
          alert("Comment NOT deleted");
        }
      });
  };

  if (author === username) {
    const onClick = () => {
      onConfirm({
        title: <h3>Are you sure?</h3>,
        description: <p>Deleting your comment cannot be undone.</p>,
        onSubmit: () => {
          handleDelete(comment_id);
        },
        onCancel: () => {
          //   alert("Cancel");
        },
      });
    };
    return (
      <button disabled={isDisabled} type="button" onClick={onClick}>
        Delete My Comment
      </button>
    );
  }

  return null;
}
