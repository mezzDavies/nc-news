import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function Header() {
  const { loggedInUser } = useContext(UserContext);

  return (
    <header id="header">
      <Link to="/">
        <h1>NC News</h1>
        <span class>
          <img
            className="header-img-avatar"
            src={loggedInUser.avatar_url}
            alt={loggedInUser.username}
          />
          {loggedInUser.username}
        </span>
      </Link>
    </header>
  );
}

export default Header;
