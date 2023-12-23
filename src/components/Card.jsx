import React from 'react';
import '../styles/card.css';

const Card = ({ movie }) => {
  return (
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
  );
};

export default Card;
