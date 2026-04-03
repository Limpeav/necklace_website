import "../../styles/ReviewList.css";

const ReviewList = ({ reviews }) => {
  if (!reviews?.length) {
    return <p className="review-empty">No reviews yet.</p>;
  }

  return (
    <div className="review-list">
      {reviews.map((review) => (
        <article key={review._id} className="surface-card review-item">
          <div className="review-header">
            <p className="review-author">{review.user?.name}</p>
            <p className="review-rating">{review.rating}/5</p>
          </div>
          <p className="review-comment">{review.comment}</p>
        </article>
      ))}
    </div>
  );
};

export default ReviewList;
