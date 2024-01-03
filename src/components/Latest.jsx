import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase/config'; 
import '../styles/card.css';
import { NavLink } from 'react-router-dom';
import Card from './Card';

const Latest = ({_movie}) => {

  const [movie, _setMovie] = useState(_movie);
  return (
    <div className='movie_div'>
      <div className="movie_div_heading">
        <h3>Latest Movies</h3>
      </div>
      <div className="movie_cards">
        {movie.slice(0, 18).map((_movie) => (
          <Card _movie={_movie} key={_movie?.id}/>
        ))}
      </div>
    </div>
  );
};

export default Latest;
