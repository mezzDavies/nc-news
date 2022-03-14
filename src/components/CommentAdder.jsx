function CommentAdder() {
  console.log("article id from ");
  return (
    <form id="comment-adder-form">
      <label>
        Reply to this article <input name="comment" />
      </label>
    </form>
  );
}

export default CommentAdder;
