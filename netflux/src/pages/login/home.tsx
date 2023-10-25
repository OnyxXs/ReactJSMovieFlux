import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { database } from "../../back/firebaseConfig";
import "./home.css";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

function HomeScreen() {
  const history = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const apiKey = "322e602f97c88b604f6b06f734d87c9c"; 
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjJlNjAyZjk3Yzg4YjYwNGY2YjA2ZjczNGQiLCJzdWIiOiI2MGM2ZjQyZjM5MjM0MjE4YzUzZjJjZjEiLCJhdXRoX3RpbWUiOjE2MzIyNzQ4Miwic2NvcGUiOiIifQ.7G05g75j5bsg88sd86d8f87g5f2";

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [apiKey, accessToken]);

  const handleClick = () => {
    signOut(database)
      .then(() => {
        history("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div>
      <h1 className="header">Home</h1>
      <button onClick={handleClick}>Sign Out</button>

      <h2 className="header">Movie List</h2>
      <ul className="main-content">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-item">
            <h3 className="movie-title">{movie.title}</h3>
            <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <p className="movie-rating">Rating: {movie.vote_average}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomeScreen;
