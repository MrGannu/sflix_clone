import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Search = ({ searchData, searchQuery }) => {
  const [newSearchData, setNewSearchData] = useState(searchData)

  useEffect(() => {
    const filteredSearchData = searchData.filter((data) =>
      data.title.toLowerCase().includes(searchQuery) ||
      data.description.toLowerCase().includes(searchQuery)
    );
    setNewSearchData(filteredSearchData);
  }, [searchData, searchQuery]);


  return (
    <div className='movie_div'>
      <div className="movie_cards">
        {newSearchData.map((_movie) => (
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
              <NavLink
                to={`/details/${encodeURIComponent(_movie?.title)}/${_movie?.id}`}
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
                className='watch_now_btn'
              >
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

export default Search;
