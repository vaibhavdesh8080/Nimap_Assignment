import React, { useEffect, useState } from 'react';
import { getUpcomingMovies } from '../api/movieApi';
import MovieDetails from './Movie';  // Import the MovieDetails component
import '../css/home.css';  // Import your CSS for styling

const UpcomedPage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);  // State to track selected movie
  const [currentPage, setCurrentPage] = useState(1);  // Current page
  const moviesPerPage = 10;  // Number of movies to show per page

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getUpcomingMovies();
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);  // Set the selected movie when clicked
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);  // Close the movie details view
  };

  // Pagination logic
  const indexOfLastMovie = currentPage * moviesPerPage;  // Index of the last movie
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;  // Index of the first movie
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);  // Get current movies

  const totalPages = Math.ceil(movies.length / moviesPerPage);  // Total number of pages

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);  // Increment page
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);  // Decrement page
    }
  };

  return (
    <div>
      {/* Conditionally render MovieDetails if a movie is selected */}
      {selectedMovie ? (
        <MovieDetails movie={selectedMovie} onClose={handleCloseDetails} />
      ) : (
        <div>
          <div className="movies-grid">
            {currentMovies.map(movie => (
              <div 
                key={movie.id} 
                className="movie-card" 
                onClick={() => handleMovieClick(movie)}  // Handle movie click
              >
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <h2>{movie.title}</h2>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomedPage;
