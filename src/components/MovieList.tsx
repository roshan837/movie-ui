import React from "react";
import { MovieListProps } from "./types";
import axios from "axios";
const MovieList: React.FC<MovieListProps> = ({ movies, onMovieClick }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const url = "http://localhost:3000/movies/";

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);

    const day = date.getDate();
    let dayString;
    switch (day) {
      case 1:
      case 21:
      case 31:
        dayString = day + "st";
        break;
      case 2:
      case 22:
        dayString = day + "nd";
        break;
      case 3:
      case 23:
        dayString = day + "rd";
        break;
      default:
        dayString = day + "th";
    }
    return formattedDate.replace(`${day}`, `${dayString}`);
  }

  const onOptionClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const onDelete = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) => {
    try {
      e.stopPropagation();
      const response = await axios.delete(url + id);
      console.log(response);
    } catch (error) {}
  };
  const onUpdate = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation();
  };

  return (
    <section className="grid grid-cols-3 gap-4">
      {movies.map((movie, index) => (
        <div
          className="relative grid p-10 bg-[#ACE2E1] cursor-pointer"
          key={index}
          onClick={() => onMovieClick(movie.id)}>
          <span className="absolute right-0 top-0 px-4" onClick={onOptionClick}>
            ...
            {isOpen && (
              <div className="absolute top-8 right-4 bg-white border border-gray-300 p-2">
                <div onClick={(e) => onDelete(e, movie.id)}>Delete</div>
                <div onClick={(e) => onUpdate(e, movie.id)}>Update</div>
              </div>
            )}
          </span>
          <label className="text-lg">{movie.name}</label>
          <label>Released: {formatDate(movie.releaseDate)}</label>
          <strong>Rating: {movie?.averageRating || 0}/10</strong>
        </div>
      ))}
    </section>
  );
};

export default MovieList;
