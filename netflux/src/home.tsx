import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { database } from "./config/firebaseConfig";
import "./home.css";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

function HomeScreen() {
  const history = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [sortBy, setSortBy] = useState<string>("title");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const apiKey = "322e602f97c88b604f6b06f734d87c9c";
  const accessToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjJlNjAyZjk3Yzg4YjUzNzE4ZTlkYWI0ZjE0MTc4YSIsInN1Ii6IjY1MzhkMDU2OWMyNGZjMDEwM2UwZjdmYyIsInNjb3BlcyI6IioiLCJ2ZXJzaW9uIjoxfQ.7G05g75j5bsg88sd86d8f87g5f2";

  const mapCategoryToGenreID = (category: string) => {
    const categoryMap: { [key: string]: number } = {
      Horror: 27,
      Romance: 10749,
      "Science Fiction": 878,
      Action: 28,
    };
    return categoryMap[category];
  };

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

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const categories = ["", "Horror", "Romance", "Science Fiction", "Action"];

  const sortedMovies = [...movies];
  sortedMovies.sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "year") {
      return (
        parseInt(b.release_date.substring(0, 4)) -
        parseInt(a.release_date.substring(0, 4))
      );
    } else if (sortBy === "director") {
    } else if (sortBy === "rating") {
      return b.vote_average - a.vote_average;
    } else if (sortBy === "category") {
      if (selectedCategory) {
        return a.genre_ids.includes(mapCategoryToGenreID(selectedCategory))
          ? -1
          : 1;
      }
    }
    return 0;
  });

  return (
    <div>
      <h1 className="header">Home</h1>
      <button onClick={handleClick}>Sign Out</button>

      <h2 className="header">Movie List</h2>
      <div className="sort-select">
        <label htmlFor="sort-select">Sort by:</label>
        <select id="sort-select" value={sortBy} onChange={handleSortChange}>
          <option value="title">Title A-Z</option>
          <option value="year">Year</option>
          <option value="rating">Rating</option>
          <option value="category">Category</option>
        </select>
        {sortBy === "category" && (
          <div className="category-buttons">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-button${
                  selectedCategory === category ? " selected" : ""
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category || "All"}
              </button>
            ))}
          </div>
        )}
      </div>
      <ul className="main-content">
        {sortedMovies.map((movie) => (
          <li key={movie.id} className="movie-item">
            <h3 className="movie-title">{movie.title}</h3>
            <img
              className="movie-poster"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <p className="movie-rating">Rating: {movie.vote_average}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomeScreen;
