import React, { useState } from "react";
import { AddMovieProps } from "./types";

const AddMovie: React.FC<AddMovieProps> = ({ onAddMovie }) => {
  const [name, setName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMovie(name, releaseDate);
    setName("");
    setReleaseDate("");
  };

  return (
    <div className="absolute w-full h-full left-0 top-0 z-20 grid place-content-center gap-4 bg-white">
      <div className="grid place-content-center gap-4 p-8 border rounded-[8px]">
        <strong className="text-lg">Add new Movie</strong>
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
          <button type="submit">Add Movie</button>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
