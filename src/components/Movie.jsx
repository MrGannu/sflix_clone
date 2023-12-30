import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase/config'; // Assuming db is the Firestore instance exported from your firebase/config file
import { Link } from 'react-router-dom';
import '../styles/card.css';

const Movie = () => {
  const [_movie, _setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleFetchMovie = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'movies')); // Assuming 'movies' is the name of your collection
      const moviesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      _setMovie(moviesData);

    } catch (error) {
      setError(`Failed to fetch movie data: ${error.message}`);
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
        {_movie.slice(0, 12).map((_movie) => (
          <div className='movie_card' key={_movie?.id}>
            <div className="movie_card_img">
              <img src={`${_movie?.image}`} alt="movie-image" />
            </div>
            <div className="movie_card_content_info">
              <div className='movie_card_details'>
                <div className='ratings'>
                  <img src='/images/star.png' alt='rating-logo' />
                  <p className='rating_text'>{_movie?.ratings}</p>
                </div>
                <p className='quality'>{_movie?.quality}</p>
                <p className='released'>{_movie?.released}</p>
              </div>
              <h3 className='title'>{_movie?.title}</h3>
              <Link to={`/details/${encodeURIComponent(_movie?.title)}/${_movie?.id}`} className='watch_now_btn'>
                <button className='watch_btn'>
                  <img src='/images/play-light.png' alt='play-logo' />
                  <p>Watch now</p>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movie;
