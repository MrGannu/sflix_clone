import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../styles/details.css"
import Suggested from './Suggested';
import ReactLoading from 'react-loading';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

const Details = () => {
    const [_movie, _setMovie] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const handleFetchMovie = async () => {
        try {
            const docSnapshot = await getDoc(doc(db, 'movies', id));
            if (docSnapshot.exists()) {
                _setMovie(docSnapshot.data());
            } else {
                setError("Movie not found");
            }
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

    if (!_movie) {
        return <div>Movie not found</div>;
    }

    return (
        <>
        {loading ? 
            <div className="loading_img">
                <ReactLoading height={40} width={40} />
            </div>
        :
            <div className='details_div'>
                <img className='background_img' src={`${_movie?.wallpaper}`} alt="movie-image" />
                <div className="movie_details">
                    <div className="movie_details_left">
                        <img src={`${_movie?.image}`} alt="movie-image" />
                    </div>
                    <div className="movie_details_right">
                        <h3 className='movie_details_title'>{_movie?.title}</h3>
                        <div className="detail_div">
                            <div className="details_quality">
                                <p>{_movie?.quality}</p>
                            </div>
                            <div className="details_trailer">
                                <img src="/images/video.png" alt="camera-logo" />
                                <p>Trailer</p>
                            </div>
                            <div className="details_ratings">
                                <p>IMDB: {_movie?.ratings}</p>
                            </div>
                            <div className="details_duration">
                                <p>{_movie?.duration}</p>
                            </div>
                        </div>
                        <div className='btn_group'>
                            <button className='video_play_btn'>
                                <img src="/images/play-dark.png" alt="play-btn" />
                                <div className="text">
                                    <small>server</small>
                                    <p>UpCloud</p>
                                </div>
                            </button>
                            <button className='video_play_btn'>
                                <img src="/images/play-dark.png" alt="play-btn" />
                                <div className="text">
                                    <small>server</small>
                                    <p>VidCloud</p>
                                </div>
                            </button>
                        </div>
                        <p className="overview">Overview:</p>
                        <p className='description'>{_movie?.description}</p>
                        <div className="movie_other_details">
                            <div className="movie_other_details_left">
                                <p><b>Released: </b>{_movie?.realised}</p>
                                <p><b>Genre: </b>{_movie?.genre}</p>
                                <p><b>Casts: </b>{_movie?.casts}</p>
                            </div>
                            <div className="movie_other_details_right">
                                <p><b>Duration: </b>{_movie?.duration}</p>
                                <p><b>Country: </b>{_movie?.country}</p>
                                <p><b>Production: </b>{_movie?.production}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        <Suggested/>
        </>
    );
};

export default Details;
