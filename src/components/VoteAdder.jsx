import { useState } from "react";
import { patchArticle } from "../api";

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
      <div>
        <button
          disabled={voteAmount > 0}
          onClick={() => {
            handleIncVote(1);
          }}
        >
          ⬆︎
        </button>
        <p>votes: {votes + voteAmount}</p>
        <button
          disabled={voteAmount < 0}
          onClick={() => {
            handleIncVote(-1);
          }}
        >
          ⬇︎
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
