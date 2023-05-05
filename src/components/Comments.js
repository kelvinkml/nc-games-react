import { useState, useEffect, useContext } from "react";
import { instance } from "../utils/axios";
import { UserContext } from "../contexts/UserContext";

export const Comments = ({ id }) => {
  const { user } = useContext(UserContext);

  const [comment, setComment] = useState();
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);

  const [error, setError] = useState(false);

  useEffect(() => {
    instance.get(`/reviews/${id}/comments`).then((result) => {
      setIsLoading(false);
      setComments(result.data.comments);
    });
  }, [id, refresh, isLoading]);

  const newComment = (event) => {
    setIsLoading(false);
    event.preventDefault();
    const commentToPost = {
      body: comment,
      username: user,
    };
    instance
      .post(`/reviews/${id}/comments`, commentToPost)
      .then((result) => {
        setRefresh(true);
        setIsLoading(true);
      })
      .catch((err) => {
        setError(true);
      });
  };

  const deleteComment = ({ comment }) => {
    instance
      .delete(`/comments/${comment.comment_id}`)
      .then(() => {
        setIsLoading(true);
      })
      .catch((err) => {});
  };

  if (isLoading) {
    return <p>Comments Loading...</p>;
  } else
    return (
      <section>
        <section className="comment-form">
          <h4 className="comment-title">Comments:</h4>
          <form className="comment-input">
            <br></br>
            <input
              placeholder="New Comment"
              type="text"
              id="comment"
              onChange={(event) => setComment(event.target.value)}
            ></input>
            <button className="comment-submit" onClick={newComment}>
              Submit
            </button>
          </form>
        </section>
        <br></br>
        <p className="hidden" hidden={!error}>
          You must be signed in to comment
        </p>
        {comments.map((comment) => {
          return (
            <section key={comment.comment_id}>
              <p className="comment-author">{comment.author} says: </p>
              <p className="comment-body">{comment.body}</p>
              <button
                hidden={comment.author !== user}
                onClick={() => deleteComment({ comment })}
              >
                Delete
              </button>
            </section>
          );
        })}
      </section>
    );
};
