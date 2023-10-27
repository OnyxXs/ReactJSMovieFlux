import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { database } from "../config/firebaseConfig";
import "./home.css";
import MovieModal from "./MovieModal";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
  overview: string;
  media_type: string;
  production_companies: { name: string }[];
  number_of_seasons?: number;
}

function HomeScreen() {
  const history = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [sortBy, setSortBy] = useState<string>("title");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  const apiKey = "322e602f97c88b604f6b06f734d87c9c";
  const accessToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjJlNj02ZmC0t" +
    "InN1YiI6IjY1MzhkYyIsInSjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4fDC3EgVki";

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
    if (searchValue) {
      fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${searchValue}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.results) {
            setMovies(data.results);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.results) {
            setMovies(data.results);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [apiKey, accessToken, searchValue]);

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
      if (a.title && b.title) {
        return a.title.localeCompare(b.title);
      }
    } else if (sortBy === "year") {
      if (a.release_date && b.release_date) {
        return (
          parseInt(b.release_date.substring(0, 4)) -
          parseInt(a.release_date.substring(0, 4))
        );
      }
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

  const filteredMovies = sortedMovies
    .filter((movie) => {
      if (selectedCategory && movie.genre_ids) {
        const genreId = mapCategoryToGenreID(selectedCategory);
        return movie.genre_ids.includes(genreId);
      }
      return true;
    })
    .filter((movie) => {
      if (searchValue && movie.title) {
        const searchKeywords = searchValue.toLowerCase();
        const movieTitle = movie.title.toLowerCase();
        return movieTitle.includes(searchKeywords);
      }
      return true;
    });

  return (
    <div>
      <h1 className="header">Home</h1>
      <button onClick={handleClick} className="button-sign-out">
        Sign Out
      </button>

      <h2 className="header">Movie List</h2>
      <div className="sort-select">
        <label htmlFor="sort-select">Sort by:</label>
        <select id="sort-select" value={sortBy} onChange={handleSortChange}>
          <option value="title">Title A-Z</option>
          <option value="year">Year</option>
          <option value="rating">Rating</option>
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
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for movies or series..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Genres</option>
          <option value="Horror">Horror</option>
          <option value="Romance">Romance</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Action">Action</option>
        </select>
      </div>
      <div className="main-content">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className="movie-item"
            onClick={() => setSelectedMovie(movie)}
          >
            <div className="movie-details">
              <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-rating">Rating: {movie.vote_average}</p>
              {movie.production_companies &&
                movie.production_companies.length > 0 && (
                  <p className="movie-producer">
                    Produced by:{" "}
                    {movie.production_companies
                      .map((company) => company.name)
                      .join(", ")}
                  </p>
                )}
              {movie.media_type === "tv" && movie.number_of_seasons && (
                <p className="movie-seasons">
                  Seasons: {movie.number_of_seasons}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default HomeScreen;
