import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../utils/axios";
import { Comments } from "./Comments";
import { Votes } from "./Votes";
import { NotFound } from "./NotFound";

export const Review = () => {
  const [error, setError] = useState();

  const [singleReview, setSingleReview] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    instance
      .get(`/reviews/${id}`)
      .then((result) => {
        setSingleReview(result.data.review[0]);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.msg);
        setIsLoading(false);
      });
  }, [id]);
  if (isLoading) {
    return <h4>Loading...</h4>;
  }

  if (error) {
    return <NotFound error={error} />;
  }

  return (
    <section className="single-review">
      <h2>{singleReview.title}</h2>
      <img
        className="large-img"
        alt={singleReview.title}
        src={singleReview.review_img_url}
      />
      <br></br>
      <p className="author">By {singleReview.owner}</p>
      <p className="category">{singleReview.category}</p>
      <br></br>
      <Votes voteNum={singleReview.votes} />
      <br></br>
      <p className="review-body">{singleReview.review_body}</p>
      <br></br>
      <div>
        <Comments id={id} />
      </div>
    </section>
  );
};
