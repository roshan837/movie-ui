import React from "react";
import { MovieReviewsProps } from "./types";

const MovieReviews: React.FC<MovieReviewsProps> = ({ movies, reviews }) => {
  return (
    <div className="p-4 absolute left-0 top-0 bg-white z-10 w-full h-full">
      <h1 className="font-medium text-3xl flex items-center justify-between">
        <span>
          {reviews?.length
            ? movies.find(
                (movie) => Number(movie.id) === Number(reviews?.[0]?.movieId)
              )?.name
            : ""}
        </span>
        <span>
          {(
            reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
          ).toFixed(1)}
          /10
        </span>
      </h1>
      {reviews.map((review) => (
        <div className="relative border p-4 my-4 grid gap-4" key={review.id}>
          <div>{review.reviewComments}</div>
          <strong className="absolute right-4 top-4">{review.rating}/10</strong>
          <div>
            By <strong>{review.reviewerName}</strong>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieReviews;
