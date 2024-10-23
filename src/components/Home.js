// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { getPopularMovies } from '../api/movieApi';
import MovieDetails from './Movie';
import '../css/home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    getPopularMovies().then(response => setMovies(response.data.results));
  }, []);

  return (
    <div>
      {selectedMovie ? (
        <MovieDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      ) : (
        <div className="movies-grid">
          {movies.map(movie => (
            <div key={movie.id} className="movie-card" onClick={() => setSelectedMovie(movie)}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <h2>{movie.title}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
