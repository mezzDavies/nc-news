import { useState } from "react";
import { patchArticle } from "../api";

import { HiOutlineThumbDown, HiOutlineThumbUp } from "react-icons/hi";

function VoteAdder({ votes, id }) {
  const [voteAmount, setVoteAmount] = useState(0);
  const [error, setError] = useState(false);

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
          disabled={voteAmount > 0}
          onClick={() => {
            handleIncVote(1);
          }}
        >
          <HiOutlineThumbUp />
        </button>
        <p>{votes + voteAmount}</p>
        <button
          style={{ cursor: "pointer" }}
          disabled={voteAmount < 0}
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

export default VoteAdder;
// pass article id on props Y
// make api helper function Y
//  make handler make request to api Y
// check response from server Y
// make error retract the optimstic vote render
