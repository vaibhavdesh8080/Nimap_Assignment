import React, { useEffect, useState } from 'react';
import { getTopRatedMovies } from '../api/movieApi';
import MovieDetails from './Movie';  
import '../css/home.css';  

const TopPage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);  
  const [currentPage, setCurrentPage] = useState(1);  
  const moviesPerPage = 10;  

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getTopRatedMovies();
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching top-rated movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);  
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  
  const indexOfLastMovie = currentPage * moviesPerPage;  
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;  
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);  

  const totalPages = Math.ceil(movies.length / moviesPerPage);  

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);  
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);  
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
                onClick={() => handleMovieClick(movie)}  
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

export default TopPage;
