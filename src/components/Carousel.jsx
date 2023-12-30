import React, { useEffect, useState } from 'react';
import "../styles/carousel.css";
import { NavLink } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

const Carousel = () => {
  const [_slide, _setSlides] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const suggestedMovies = [..._slide].sort((a, b) => b.id - a.id);

  const [currentIndex, setCurrentIndex] = useState(3);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % _slide.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + _slide.length) % _slide.length);
  };
  
  const handleFetchMovie = async () => {
    setLoading(true)
      try {
        const querySnapshot = await getDocs(collection(db, 'movies')); // Assuming 'movies' is the name of your collection
        const moviesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        _setSlides(moviesData);
      } catch (error) {
          setError(`Failed to fetch movie data: ${error.message}`);
      } finally {
          setLoading(false);
      }
  };
  
  useEffect(() => {
      handleFetchMovie();
  }, []);

  if (error) {
      return <p>Error: {error}</p>;
  }
  
  if (!_slide) {
      return <div>Movie not found</div>;
  }

  return (
    <>
      {loading ?
        <div className="loading_screen"></div>
      :
        <div className='carousel_div'>
          <div className="carousel_left">
            <div className={`slide ${currentIndex === currentIndex ? 'active' : ''}`}>
                <img src={`${_slide[currentIndex]?.wallpaper}`} loading='eager' alt="" />
            </div>
            <div className="navigation_info">
              <div className="slide_navigations">
                <img src="images/arrow-left.png" onClick={prevSlide} alt="" />
                <img src="images/arrow-right.png" onClick={nextSlide} alt="" />
              </div>
              <div className="slides_information">
                <div className={`slides_info_left ${currentIndex === currentIndex ? 'active' : ''}`}>
                  <img src={`${_slide[currentIndex]?.image}`} loading='lazy' alt="" />
                </div>
                <div className="slides_info_right">
                  <div className="slide_info_right_start">
                    <NavLink className='watch_now_btn' to={`details/${encodeURIComponent(_slide[currentIndex]?.title)}/${_slide[currentIndex]?.id}`}>
                        <img className='watch_now_btn_img' src="images/play.png" alt="" />
                    </NavLink>
                  </div>
                  <div className="slide_info_right_end">
                    <h3>{_slide[currentIndex]?.title}</h3>
                    <div className="rating_quality">
                      <div className="rate">
                        <img src="images/star.png" alt="" />
                        <p>{_slide[currentIndex]?.ratings}</p>
                      </div>
                      <div className="quali">
                        <p>HD</p>
                      </div>
                    </div>
                    <div className="slide_description">
                      <p>{_slide[currentIndex]?.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel_right">
            <div className="carousel_right_left">
              {suggestedMovies.slice(0, 3).map((movie) => (
                <div key={movie?.id} className="carousel_right_movie_card">
                  <div className="carousel_right_movie_card_img">
                    <img src={`${movie?.image}`} alt="movie-image" />
                  </div>
                  <div className='carousel_right_movie_card_info'>
                    <div className="carousel_right_movie_card_details">
                      <div className="carousel_right_ratings">
                        <img src="images/star.png" alt="rating-logo" />
                        <p className='carousel_right_rating_text'>{movie?.ratings}</p>
                      </div>
                      <p className='carousel_right_quality'>HD</p>
                    </div>
                    <div className="carousel_right_movie_card_info_text_content">
                      <h3 className='carousel_right_title'>{movie?.title}</h3>
                      <p className='carousel_right_description'>{movie?.description}</p>
                    </div>
                    <NavLink className='watch_now_btn' to={`details/${encodeURIComponent(movie?.title)}/${movie?.id}`}>
                      <button className='carousel_right_watch_btn'>
                        <img src="images/play-light.png" alt="play-logo" />
                        <p>Watch now</p>
                      </button>
                    </NavLink>
                  </div>
                </div>
              ))}
            </div>
            <div className="carousel_right_right">
              Share with
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default Carousel;
