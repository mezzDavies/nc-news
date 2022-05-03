import { useEffect, useState } from "react";
import { fetchTopics } from "../api";
import { Link } from "react-router-dom";
function Nav() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics().then(({ data: { topics } }) => {
      setTopics(topics);
    });
  }, []);

  return (
    <ul className="nav">
      <li>
        <Link to="/">all topics</Link>
      </li>

      {topics.map((topic) => {
        return (
          <li key={topic.slug}>
            <Link to={`/articles/${topic.slug}`}>{topic.slug}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export default Nav;
