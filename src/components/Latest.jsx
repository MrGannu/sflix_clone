import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase/config'; 
import '../styles/card.css';
import { NavLink } from 'react-router-dom';

const Latest = () => {

  const [_movie, _setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sortedMovies = [..._movie].sort((a, b) => b.id - a.id);
  
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
        <h3>Latest Movies</h3>
      </div>
      <div className="movie_cards">
        {sortedMovies.slice(0, 12).map((_movie) => (
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
              <NavLink to={`/details/${encodeURIComponent(_movie?.title)}/${_movie?.id}`}
              onClick={()=>{
                window.scrollTo(0,0);
                
              }} className='watch_now_btn'>
                <button className='watch_btn'>
                  <img src='/images/play-light.png' alt='play-logo' />
                  <p>Watch now</p>
                </button>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Latest;
