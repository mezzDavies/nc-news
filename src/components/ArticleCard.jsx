function ArticleCard(props) {
  console.log("articles in separate card", props);
  const { article } = props;
  return (
    <li id="article-card">
      <div className="article-text-left">
        <h3>{article.title}</h3>
        <p id="articlecard-article-topic">{article.topic}</p>
        <p>By {article.author}</p>
        <p>at: {article.created_at}</p>
      </div>
      <div className="article-text-right">
        <p>Comments:&nbsp;{article.comment_count}</p>
        <p>Votes: {article.votes}</p>
      </div>
    </li>
  );
}

export default ArticleCard;
