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
}

function HomeScreen() {
  const history = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [sortBy, setSortBy] = useState<string>("title");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  const apiKey = "322e602f97c88b604f6b06f734d87c9c";
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjJlNj02ZmMxMGUwZjdmYyIsInN1YiI6IjY1MzhkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4fDC3EgVki";

  const mapCategoryToGenreID = (category: string) => {
    const categoryMap: { [key: string]: number } = {
      "Horror": 27,
      "Romance": 10749,
      "Science Fiction": 878,
      "Action": 28,
    };
    return categoryMap[category];
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
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
      // Vous pouvez implémenter la logique pour trier par réalisateur ici
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

  // Filtrer les films/séries en fonction de la recherche et du genre
  const filteredMovies = sortedMovies
    .filter((movie) => {
      // Filtrer par genre (si un genre est sélectionné)
      if (selectedCategory) {
        const genreId = mapCategoryToGenreID(selectedCategory);
        return movie.genre_ids.includes(genreId);
      }
      // Sinon, retournez true pour conserver tous les films/séries
      return true;
    })
    .filter((movie) => {
      // Filtrer par mots-clés de recherche
      const searchKeywords = searchValue.toLowerCase();
      const movieTitle = movie.title.toLowerCase();
      return movieTitle.includes(searchKeywords);
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
        <select
          id="sort-select"
          value={sortBy}
          onChange={handleSortChange}
        >
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
      {/* Affichez la liste filtrée des films/séries */}
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
            </div>
          </div>
        ))}
      </div>
      {/* Affichez la fenêtre modale avec les détails du film/série sélectionné */}
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
