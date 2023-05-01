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
    <div className="single-review-page">
      <section className="single-review">
        <div className="image-container">
          <img
            className="large-img"
            alt={singleReview.title}
            src={singleReview.review_img_url}
          />
        </div>
        <h2 className="single-review-title">{singleReview.title}</h2>

        <p className="author">By {singleReview.owner}</p>
        <p className="category">{singleReview.category}</p>

        <Votes voteNum={singleReview.votes} />

        <p className="review-body">{singleReview.review_body}</p>

        <div>
          <Comments id={id} />
        </div>
      </section>
    </div>
  );
};
