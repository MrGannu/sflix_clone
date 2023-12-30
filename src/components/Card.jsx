import React from 'react';
import '../styles/card.css';
import { Link } from 'react-router-dom';

const Card = ({ _movie }) => {
  return (
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
          <a href={`/details/${encodeURIComponent(_movie?.title)}/${_movie?.id}`} className='watch_now_btn'>
            <button className='watch_btn'>
              <img src='/images/play-light.png' alt='play-logo' />
              <p>Watch now</p>
            </button>
          </a>
        </div>
      </div>
  );
};

export default Card;
