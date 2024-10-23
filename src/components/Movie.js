// src/components/Movie.js
import React, { useEffect, useState } from 'react';
import { getMovieCast } from '../api/movieApi';
import '../css/movie.css';

const Movie = ({ movie, onClose }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (movie) {
      getMovieCast(movie.id).then(response => setCast(response.data.cast));
    }
  }, [movie]);

  if (!movie) return null;

  return (
    <div className="movie-details">
      <button onClick={onClose}>Close</button>
      <div className="movie-header">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div>
          <h2>{movie.title}</h2>
          <p>Rating: {movie.vote_average}</p>
          <p>Release Date: {movie.release_date}</p>
          <p>{movie.overview}</p>
        </div>
      </div>
      <h3>Cast</h3>
      <div className="cast-grid">
        {cast.slice(0, 6).map(actor => (
          <div key={actor.id} className="cast-card">
            <img src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} alt={actor.name} />
            <p>{actor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movie;
