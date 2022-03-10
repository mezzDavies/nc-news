import { Link } from "react-router-dom";

function ArticleCard(props) {
  const { article } = props;
  const date = new Date(Date.parse(article.created_at));

  return (
    <Link className="card-link" to={`/article/${article.article_id}`}>
      <li id="article-card">
        <div className="article-text-left">
          <h2>{article.title}</h2>
          <p id="articlecard-article-topic">{article.topic}</p>
          <p id="articlecard-article-author">By {article.author}</p>
          <p id="articlecard-article-created">{`At: ${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}</p>
        </div>
        <div className="article-text-right">
          <p id="articlecard-article-comments">
            Comments:&nbsp;{article.comment_count}
          </p>
          <p id="articlecard-article-votes">Votes: {article.votes}</p>
        </div>
      </li>
    </Link>
  );
}

export default ArticleCard;
