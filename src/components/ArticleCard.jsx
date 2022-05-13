import { Link } from "react-router-dom";
import { HiOutlineChatAlt2, HiOutlineThumbUp } from "react-icons/hi";

import { timeDifference } from "../utils/dateStampConverter";

function ArticleCard(props) {
  const { article } = props;

  const body = article.body;

  const currentTime = Date.now();
  const articlePostedTime = Date.parse(article.created_at);
  const articlePosted = timeDifference(currentTime, articlePostedTime);

  return (
    <Link className="card-link" to={`/article/${article.article_id}`}>
      <li id="article-card">
        <div className="articlecard-text-main">
          <h2>{article.title}</h2>
          <p id="articlecard-article-topic">//{article.topic}</p>
          <p>{body.split(" ").slice(0, 12).join(" ")}...</p>
        </div>
        <div className="articlecard-lower">
          <div className="articlecard-text-lowerleft">
            <p id="articlecard-article-author">By {article.author}</p>
            <p id="articlecard-article-created">{`${articlePosted}`}</p>
          </div>

          <div className="articlecard-text-lowerright">
            <p id="articlecard-article-comments">
              <HiOutlineChatAlt2 />
              &nbsp;{article.comment_count}
            </p>
            <p id="articlecard-article-votes">
              <HiOutlineThumbUp /> {article.votes}
            </p>
          </div>
        </div>
      </li>
    </Link>
  );
}

export default ArticleCard;
