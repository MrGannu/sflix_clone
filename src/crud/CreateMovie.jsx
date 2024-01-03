import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc } from 'firebase/firestore';
import { movieRef } from '../firebase/config';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import "../styles/create-movies.css"

const CreateMovie = () => {
  const [movieData, setMovieData] = useState({
    title: '',
    image: '',
    wallpaper: '',
    description: '',
    duration: '',
    ratings: '',
    quality: 'HD',
    genre: '',
    realised: '',
    casts: '',
    production: '',
    country: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setLoading(true);
        const storage = getStorage();
        const storageReference = storageRef(storage, `movie_images/${file.name}`);
        await uploadBytes(storageReference, file);
        const downloadURL = await getDownloadURL(storageReference);
        setMovieData((prevData) => ({ ...prevData, [type]: downloadURL }));
      } catch (error) {
        console.error('File upload failed:', error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCreateNewMovie = async (event) => {
    event.preventDefault();
  
    setLoading(true);
  
    try {
      // Firestore will generate a unique ID for the movie document
      await addDoc(movieRef, movieData);
  
      setError('');
      // Optionally, you can redirect to another page after successful creation
      navigate('/');
    } catch (error) {
      setError(`Movie creation failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='create_movies_div'>
      <h2>Create a New Movie</h2>
      <form className='create_movies_form' onSubmit={handleCreateNewMovie}>
        <div className="create_form_group">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={movieData.title}
          onChange={(e) => setMovieData({ ...movieData, title: e.target.value })}
        />
        </div>
        <div className="create_form_group">
        <label>Image URL:</label>
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'image')} />

        </div>
        <div className="create_form_group">
          
        <label>Wallpaper URL:</label>
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'wallpaper')} />

        </div>
        <div className="create_form_group">
        <label>Description:</label>
        <textarea
          name="description"
          value={movieData.description}
          onChange={(e) => setMovieData({ ...movieData, description: e.target.value })}
        ></textarea>
        </div>
        <div className="create_form_group">
        <label>Duration:</label>
        <input
          type="text"
          name="duration"
          value={movieData.duration}
          onChange={(e) => setMovieData({ ...movieData, duration: e.target.value })}
        />
        </div>
        <div className="create_form_group">
          
        <label>Ratings:</label>
        <input
          type="text"
          name="ratings"
          value={movieData.ratings}
          onChange={(e) => setMovieData({ ...movieData, ratings: e.target.value })}
        />
        </div>
        <div className="create_form_group">
          

        <label>Genre:</label>
        <input
          type="text"
          name="genre"
          value={movieData.genre}
          onChange={(e) => setMovieData({ ...movieData, genre: e.target.value })}
        />

        </div>
        <div className="create_form_group">
        <label>Release Year:</label>
        <input
          type="text"
          name="realised"
          value={movieData.realised}
          onChange={(e) => setMovieData({ ...movieData, realised: e.target.value })}
        />
        </div>
        <div className="create_form_group">
        <label>Cast:</label>
        <input
          type="text"
          name="casts"
          value={movieData.casts}
          onChange={(e) => setMovieData({ ...movieData, casts: e.target.value })}
        />
        </div>
        <div className="create_form_group">
          
        <label>Production:</label>
        <input
          type="text"
          name="production"
          value={movieData.production}
          onChange={(e) => setMovieData({ ...movieData, production: e.target.value })}
        />
        </div>
        <div className="create_form_group">
          
        <label>Country:</label>
        <input
          type="text"
          name="country"
          value={movieData.country}
          onChange={(e) => setMovieData({ ...movieData, country: e.target.value })}
        />
        </div>











        {error && <div className="error-message">{error}</div>}
        <button className='create_movie_btn' type="submit" disabled={loading}>
          {loading ? <img className='upload_loading_img' src="/images/upload_loading.png" alt="" /> : 'Create Movie'}
        </button>
      </form>
    </div>
  );
};

export default CreateMovie;
