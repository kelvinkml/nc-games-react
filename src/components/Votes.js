import { useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../utils/axios";
export const Votes = ({ voteNum }) => {
  const { id } = useParams();
  const [incNum, setIncNum] = useState(0);
  const [errorIs, setErrorIs] = useState(true);
  const incVotes = (incNumber) => {
    setIncNum((curr) => curr + incNumber);
    instance
      .patch(`/reviews/${id}`, { inc_votes: incNumber })
      .then((result) => {})
      .catch((err) => {
        setErrorIs(false);
      });
  };
  return (
    <div className="votes-section">
      <p className="votes">Votes: {voteNum + incNum}</p>
      <section className="votes-button-section">
        <button
          className="votes-button-up"
          disabled={incNum === 1}
          onClick={() => incVotes(1)}
        >
          +1
        </button>
        <button
          className="votes-button-down"
          disabled={incNum === -1}
          onClick={() => incVotes(-1)}
        >
          -1
        </button>
      </section>
      <p hidden={errorIs}>Please refresh and try again</p>
    </div>
  );
};
