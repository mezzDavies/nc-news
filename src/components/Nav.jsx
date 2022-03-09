import { useEffect, useState } from "react";
import { fetchTopics } from "../api";
import { Link } from "react-router-dom";
function Nav() {
  // get topics - api call *
  // map topics and create <li> for each (within <ul>)*
  // update FetchArticles to take topic parameter for query?
  // how do I get the argument to Fetch articles? onClick in link?
  // set up route /articles/:topic
  // change url then get content to reflect this
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics().then((res) => {
      setTopics(res.data.topics);
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
