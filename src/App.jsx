// Import necessary components and hooks
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from './firebase/config';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './layout/Layout';
import NoPage from './pages/NoPage';
import Details from './components/Details';
import CreateMovie from './crud/CreateMovie';
import EditMovies from './crud/EditMovies';

const App = () => {

  // context api
  const [_movie, _setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search Functionality Code ----
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);

  const handleFetchMovie = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'movies'));
      const moviesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      _setMovie(moviesData);
      setSearchData(moviesData);
    } catch (error) {
      setError(`Failed to fetch movie data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchMovie();
  }, []);

  if (loading) {
    return <div className='Loading_screen'></div>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div className='app_div'>
      <Routes>
        <Route
          path='/'
          element={<Layout setSearchQuery={setSearchQuery} searchQuery={searchQuery} searchData={searchData} alert={alert}/>}
        >
          <Route index element={<Home _movie={_movie} />} />
          <Route path='/create-movies' element={<CreateMovie />} />
          <Route path='/edit-movies' element={<EditMovies _movie={_movie} isEditing={true}/>} />
          <Route path='/edit-movies-form/:id' element={<CreateMovie isEditing={true} />} />
          <Route path='details/:title/:id' element={<Details />} />
          <Route path='*' element={<NoPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
