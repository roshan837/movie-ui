import React, { useState } from "react";
import { AddReviewProps } from "./types";

const AddReview: React.FC<AddReviewProps> = ({ onAddReview, movies }) => {
  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState("");
  const [reviewComments, setReviewComments] = useState("");
  const [movieId, setMovieId] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddReview({
      movieId: Number(movieId),
      reviewerName,
      rating: Number(rating),
      reviewComments,
    });
    setReviewerName("");
    setRating("");
    setReviewComments("");
  };

  return (
    <div className="absolute w-full h-full left-0 top-0 z-20 grid place-content-center gap-4 bg-white">
      <div className="grid place-content-center gap-4 p-8 border rounded-[8px]">
        <strong className="text-lg">Add new review</strong>
        <form onSubmit={handleSubmit}>
          <select
            value={movieId}
            onChange={(e) => setMovieId(Number(e.target.value))}>
            <option value="">Select a movie</option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={reviewerName}
            placeholder="Your Name"
            onChange={(e) => setReviewerName(e.target.value)}
          />
          <input
            type="number"
            min={0}
            max={10}
            value={rating}
            placeholder="Rating out of 10"
            onChange={(e) => setRating(e.target.value)}
          />
          <textarea
            value={reviewComments}
            placeholder="Review comments"
            onChange={(e) => setReviewComments(e.target.value)}
          />
          <button type="submit">Add Review</button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
