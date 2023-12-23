import React, { useEffect, useState } from 'react';
import '../styles/card.css';
import Card from './Card';

const Latest = () => {

  const [_movie, _setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sortedMovies = [..._movie].sort((a, b) => b.id - a.id);

  
  const handleFetchMovie = async () => {
    try {
      const result = await fetch("", {
        method: 'GET',
      });
  
      if (result.ok) {
        const response = await result.json();
        _setMovie(response);
      } else {
        setError("Failed to fetch movie data");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    handleFetchMovie();
  }, []);
  
  if (loading) {
    return <div className='Loading_screen'></div>;
  }
  
  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div className='movie_div'>
      <div className="movie_div_heading">
        <h3>Latest Movies</h3>
      </div>
      <div className="movie_cards">
        {sortedMovies.slice(0, 12).map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Latest;
