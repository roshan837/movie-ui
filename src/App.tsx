import React, { useState } from "react";
import MovieList from "./components/MovieList";
import MovieReviews from "./components/MovieReviews";
import AddMovie from "./components/AddMovie";
import AddReview from "./components/AddReview";
import axios from "axios";
import { Review, Movie } from "./components/types";

const url = "http://localhost:3000";

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showAddMovie, setShowAddMovie] = useState<boolean>(false);
  const [showAddReview, setShowAddReview] = useState<boolean>(false);

  const getMovieList = async () => {
    try {
      const response: { data: Movie[] } = await axios.get(url + "/movies");
      setMovies(response.data);
    } catch (error) {
      setMovies([]);
    }
  };

  const getReviewList = async () => {
    try {
      const response: { data: Review[] } = await axios.get(url + "/reviews");
      return response.data;
    } catch (error) {}
  };
  React.useEffect(() => {
    getMovieList();
  }, []);
  const handleMovieClick = async (id: number) => {
    const response: Review[] | undefined = await getReviewList();
    if (!response?.length) return;
    setSelectedMovieId(id);
    setReviews(response?.filter((ele) => Number(ele.movieId) === id));
    console.log(id, response);
  };

  const handleAddMovie = async (name: string, releaseDate: string) => {
    try {
      await axios.post(url + "/movies", { name, releaseDate });
      getMovieList();
    } catch (error) {
    } finally {
      setShowAddMovie(false);
    }
  };

  const handleAddReview = async (review: Review) => {
    try {
      await axios.post(url + "/reviews", review);
    } catch (error) {}
    setShowAddReview(false);
  };

  const onLogoClick = () => {
    setShowAddMovie(false);
    setShowAddReview(false);
    setSelectedMovieId(null);
  };
  return (
    <main className="grid grid-rows-[auto_1fr] h-full">
      <header className="flex items-center justify-between p-4 bg-[#B4B4B8]">
        <h1
          className="text-xl font-semibold cursor-pointer"
          onClick={onLogoClick}>
          MOVIECRITIC
        </h1>
        <div className="flex gap-2">
          <button onClick={() => setShowAddMovie(true)}>Add New Movie</button>
          <button onClick={() => setShowAddReview(true)}>Add New Review</button>
        </div>
      </header>
      <section className="h-full relative p-4">
        <h1 className="text-2xl font-semibold py-4">
          The best Movie reviews site!
        </h1>
        <MovieList movies={movies} onMovieClick={handleMovieClick} />
        {showAddMovie && <AddMovie onAddMovie={handleAddMovie} />}
        {Number.isFinite(selectedMovieId) && (
          <MovieReviews movies={movies} reviews={reviews} />
        )}
        {showAddReview && (
          <AddReview onAddReview={handleAddReview} movies={movies} />
        )}
      </section>
    </main>
  );
};

export default App;
