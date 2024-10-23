// src/components/SingleMovie.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieCast } from '../api/movieApi';

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getMovieDetails(id).then(response => setMovie(response.data));
    getMovieCast(id).then(response => setCast(response.data.cast));
  }, [id]);

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <h2>Cast</h2>
      <ul>
        {cast.map(actor => (
          <li key={actor.id}>{actor.name} as {actor.character}</li>
        ))}
      </ul>
    </div>
  );
};

export default SingleMovie;
