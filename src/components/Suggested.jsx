import React, { useState } from 'react';
import '../styles/card.css';
import Card from './Card';

const Suggested = ({_suggestedMovie}) => {
  const [movie, setMovie] = useState(_suggestedMovie)
  console.log("suggested movie",movie);
  return (
    <div className='movie_div'>
      <div className="movie_div_heading">
        <h3>You may also like</h3>
      </div>
      <div className="movie_cards">
        {movie.slice(0, 12).map((_movie) => (
          <Card _movie={_movie}/>
        ))}
      </div>
    </div>
  );
}

export default Suggested