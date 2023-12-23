import React, { useEffect, useState } from 'react';
import '../styles/card.css';

const Suggested = () => {
  const [_movie, _setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sortedMovies = [..._movie].sort((a, b) => b.genre - a.genre);
  
  const handleFetchMovie = async () => {
    try {
      const result = await fetch("http://localhost:8000/api/movie", {
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
    return <div className='Loading_screen'>Loading...</div>;
  }
  
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='movie_div'>
      <div className="movie_div_heading">
        <h3>You may also like</h3>
      </div>
      <div className="movie_cards">
        {sortedMovies.slice(0, 12).map((movie) => (
            <div className='movie_card' key={movie?.id}>
              <div className="movie_card_img">
              <img src={`http://localhost:8000/movie/image/${movie?.image}`} alt="movie-image" />
              </div>
              <div className="movie_card_content_info">
                <div className='movie_card_details'>
                  <div className='ratings'>
                    <img src='/images/star.png' alt='rating-logo' />
                    <p className='rating_text'>{movie?.ratings}</p>
                  </div>
                  <p className='quality'>{movie?.quality}</p>
                  <p className='released'>{movie?.released}</p>
                </div>
                <h3 className='title'>{movie?.title}</h3>
                <a className='watch_now_btn' href={`/details/${movie?.title}/${movie?.id}`}>
                  <button className='watch_btn'>
                    <img src='/images/play-light.png' alt='play-logo' />
                    <p>Watch now</p>
                  </button>
                </a>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}

export default Suggested