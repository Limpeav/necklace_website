const ReviewList = ({ reviews }) => {
  if (!reviews?.length) {
    return <p className="text-sm text-stone-400">No reviews yet.</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <article key={review._id} className="surface-card p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="font-semibold text-white">{review.user?.name}</p>
            <p className="text-sm text-gold">{review.rating}/5</p>
          </div>
          <p className="mt-3 text-sm leading-7 text-stone-300">{review.comment}</p>
        </article>
      ))}
    </div>
  );
};

export default ReviewList;
