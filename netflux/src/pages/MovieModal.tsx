import React, { useState } from "react";
import "./MovieModal.css";
import { auth } from "../config/firebaseConfig";

interface Movie {
  poster_path: string;
  title: string;
  vote_average: number;
  overview: string;
  producer?: string;
  seasons?: number;
}

interface UserComment {
  rating: number;
  comment: string;
  userName: string;
}

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

function MovieModal({ movie, onClose }: MovieModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [userComments, setUserComments] = useState<UserComment[]>([]);

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(parseInt(event.target.value));
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    const user = auth.currentUser;
    if (user) {
      const existingComment = userComments.find(
        (comment) => comment.userName === user.email
      );

      if (existingComment) {
        alert(
          "Vous avez déjà posté un commentaire. Vous ne pouvez en poster qu'un seul."
        );
      } else {
        const newComment: UserComment = {
          rating,
          comment,
          userName: user.email!,
        };
        setUserComments([...userComments, newComment]);

        setRating(0);
        setComment("");
      }
    } else {
      alert("Vous devez être connecté pour laisser un commentaire.");
    }
  };

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

          <div className="user-comments">
            <h3>User Comments</h3>
            <div className="comments-list">
              {userComments.map((userComment, index) => (
                <div key={index} className="user-comment">
                  <p>{userComment.userName}:</p>
                  <p>Rating: {userComment.rating}</p>
                  <p>Comment: {userComment.comment}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="comment-form">
            <h3>Leave a Comment</h3>
            <label htmlFor="rating">Rating:</label>
            <input
              type="number"
              id="rating"
              min="0"
              max="10"
              value={rating}
              onChange={handleRatingChange}
            />
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              value={comment}
              onChange={handleCommentChange}
            />
            <button onClick={handleCommentSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
