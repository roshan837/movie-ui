import React from "react";
import { MovieListProps } from "./types";

const MovieList: React.FC<MovieListProps> = ({ movies, onMovieClick }) => {
  return (
    <section className="grid grid-cols-3 gap-4">
      {movies.map((movie, index) => (
        <div
          className="grid p-10 bg-[#ACE2E1] cursor-pointer"
          key={index}
          onClick={() => onMovieClick(movie.id)}>
          <label className="text-lg">{movie.name}</label>
          <label>Released: {movie.releaseDate}</label>
          <strong>Rating: {movie?.averageRating || 0}/10</strong>
        </div>
      ))}
    </section>
  );
};

export default MovieList;
