import { useState, useContext } from "react";
import { patchArticle } from "../api";
import { UserContext } from "../contexts/UserContext";

import { HiOutlineThumbDown, HiOutlineThumbUp } from "react-icons/hi";

export default function VoteAdder({ votes, id, author }) {
  const [voteAmount, setVoteAmount] = useState(0);
  const [error, setError] = useState(false);
  const {
    loggedInUser: { username },
  } = useContext(UserContext);

  const handleIncVote = (incVote) => {
    setError(false);
    setVoteAmount((currentVotes) => {
      return currentVotes + incVote;
    });
    patchArticle(id, incVote).catch((err) => {
      setError(true);
      setVoteAmount((currentVotes) => {
        return currentVotes - incVote;
      });
    });
  };

  return (
    <div className="vote-adder">
      <div className="vote-adder-buttons">
        <button
          style={{ cursor: "pointer" }}
          disabled={voteAmount > 0 || author === username}
          onClick={() => {
            handleIncVote(1);
          }}
        >
          <HiOutlineThumbUp />
        </button>
        <p>{votes + voteAmount}</p>
        <button
          style={{ cursor: "pointer" }}
          disabled={voteAmount < 0 || author === username}
          onClick={() => {
            handleIncVote(-1);
          }}
        >
          <HiOutlineThumbDown />
        </button>
      </div>

      {error ? (
        <p id="adder-error">Vote not registered, you may be offline.</p>
      ) : null}
    </div>
  );
}
