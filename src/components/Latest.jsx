import React, { useEffect, useState } from 'react';
import '../styles/card.css';
import Card from './Card';

const Latest = ({_movie}) => {

  const [movie, _setMovie] = useState(_movie);
  return (
    <div className='movie_div'>
      <div className="movie_div_heading">
        <h3>Latest Movies</h3>
      </div>
      <div className="movie_cards">
        {movie.map((_movie) => (
          <Card _movie={_movie} key={_movie?.id}/>
        ))}
      </div>
    </div>
  );
};
// .slice(0, 18)
export default Latest;
