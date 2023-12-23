import React, { useEffect, useState } from 'react'
import Card from './Card'
import "../styles/card.css"

const Movie = () => {
  const [_movie, _setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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
        <h3>Trending</h3>
        <ul>
          <li><img src="images/play-dark.png" className='play_dark' alt="" />Movies</li>
          <li><img src="images/menu.png" alt="" />Tv Shows</li>
        </ul>
      </div>
      <div className="movie_cards">
        {_movie.slice(0, 12).map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  )
}

export default Movie