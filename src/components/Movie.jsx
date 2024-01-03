import React, { useState } from 'react';
import '../styles/card.css';
import Card from './Card';

const Movie = ({_movie}) => {
  const [movieData, setMovieData] = useState(_movie)
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
        {movieData.slice(0, 12).map((_movie) => (
          <Card _movie={_movie} key={_movie?.id}/>
        ))}
      </div>
    </div>
  );
};

export default Movie;
