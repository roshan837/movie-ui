export interface Movie {
  id: number;
  name: string;
  releaseDate: string;
  averageRating?: string;
}

export interface MovieListProps {
  movies: Movie[];
  onMovieClick: (id: number) => void;
}

export interface AddMovieProps {
  onAddMovie: (name: string, releaseDate: string) => void;
}

export interface MovieReviewsProps {
  reviews: Review[];
  movies: Movie[];
}

export interface Review {
  id?: number;
  movieId?: number;
  reviewerName: string;
  rating: number;
  reviewComments: string;
}

export interface AddReviewProps {
  onAddReview: (review: Review) => void;
  movies: Movie[];
}
