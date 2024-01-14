import React, { useState } from 'react';
import '../styles/card.css';
import { NavLink } from 'react-router-dom';
import Loading from '../loading/Loading';

const Card = ({ _movie, isEditing}) => {
  const [movie, setMovie] = useState(_movie)
  function handleScrollToTop(){
    return(
      window.scrollTo(0,0)
    )
  }
  return (
      <div className='movie_card' key={movie?.id}>
        <div className="movie_card_img">
          {!movie?.image ? <Loading/> : <img src={`${movie?.image}`} loading='lazy' alt="movie-image" />}
        </div>
        <div className="movie_card_content_info">
          <div className='movie_card_details'>
            <div className='ratings'>
              <img src='/images/star.png' loading='lazy' alt='rating-logo' />
              <p className='rating_text'>{movie?.ratings}</p>
            </div>
            <p className='quality'>{movie?.quality}</p>
            <p className='released'>{movie?.released}</p>
          </div>
          <h3 className='title'>{movie?.title}</h3>
          {isEditing ? (   
            <>       
              {
                isEditing && 
                <div className="action_div">
                  <NavLink to={`/edit-movies-form/${movie?.id}`}  className='watch_now_btn' onClick={handleScrollToTop}>
                    <button className='watch_btn'>
                      <img src='/images/edit.png' alt='play-logo' />
                      <p>Edit</p>
                    </button>
                  </NavLink>
                </div>
              }
            </>
          ) : (
            <NavLink to={`/details/${encodeURIComponent(movie?.title)}/${movie?.id}`} onClick={handleScrollToTop} className='watch_now_btn'>
              <button className='watch_btn'>
                <img src='/images/play-light.png' alt='play-logo' />
                <p>Watch now</p>
              </button>
            </NavLink>
          )}
        </div>
      </div>
  );
};

export default Card;
