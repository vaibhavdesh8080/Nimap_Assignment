import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchMovies } from '../api/movieApi';
import MovieDetails from './Movie';  // Import the MovieDetails component
import '../css/home.css';  // Import your CSS for styling

const SearchedMovie = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);  // State to track selected movie
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await searchMovies(query);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error searching for movies:", error);
      }
    };

    fetchMovies();
  }, [query]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);  // Set the selected movie when clicked
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);  // Close the movie details view
  };

  return (
    <div>
      
      {/* Conditionally render MovieDetails if a movie is selected */}
      {selectedMovie ? (
        <MovieDetails movie={selectedMovie} onClose={handleCloseDetails} />
      ) : (
        <div>
          {movies.length === 0 ? (  // Check if movies array is empty
            <p>No movies found for "{query}".</p>  // Message if no movies are found
          ) : (
            <div className="movies-grid">
              {movies.map(movie => (
                <div 
                  key={movie.id}  // Added key prop for unique identification
                  className="movie-card" 
                  onClick={() => handleMovieClick(movie)}  // Handle movie click
                >
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  <h2>{movie.title}</h2>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchedMovie;
