import React from "react";
import "./MovieModal.css";

interface Movie {
  poster_path: string;
  title: string;
  vote_average: number;
  overview: string;
  producer?: string;
  seasons?: number;
}

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

function MovieModal({ movie, onClose }: MovieModalProps) {
  return (
    <div className="movie-modal">
      <div className="modal-background">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <img
            className="movie-poster"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
          <h2 className="movie-title">{movie.title}</h2>
          <p className="movie-rating">Rating: {movie.vote_average}</p>
          <p className="movie-summary">{movie.overview}</p>
          {movie.producer && (
            <p className="movie-producer">Producer: {movie.producer}</p>
          )}
          {movie.seasons && (
            <p className="movie-seasons">Seasons: {movie.seasons}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
