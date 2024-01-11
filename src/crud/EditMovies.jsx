import React, { useState } from 'react'
import "../styles/edit-movies.css"
import Card from '../components/Card';

const EditMovies = ({_movie, isEditing}) => {
    const [movies, setMovies] = useState(_movie)
    console.log(movies);
  return (
    <div className='edit_movies_div'>
        {movies.map((_movie) =>{
            return(
                <Card key={_movie?.id} _movie={_movie} isEditing={isEditing}/>
            )
        })}
        {/* <table>
            <thead>
                <tr>
                    <th>title</th>
                    <th>image</th>
                    <th>wallpaper</th>
                    <th>description</th>
                    <th>duration</th>
                    <th>ratings</th>
                    <th>quality</th>
                    <th>genre</th>
                    <th>realised</th>
                    <th>casts</th>
                    <th>production</th>
                    <th>country</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {movies.map((dat) =>{
                    return(
                        <tr key={dat?.id}>
                            <td>{dat?.title}</td>
                            <td><img src={dat?.image} alt="movie_img" className='td_movie_image' /></td>
                            <td><img src={dat?.wallpaper} alt="movie_img" className='td_movie_wallpaper' /></td>
                            <td>{dat?.description}</td>
                            <td>{dat?.duration}</td>
                            <td>{dat?.ratings}</td>
                            <td>{dat?.quality}</td>
                            <td>{dat?.genre}</td>
                            <td>{dat?.realised}</td>
                            <td>{dat?.casts}</td>
                            <td>{dat?.production}</td>
                            <td>{dat?.country}</td>
                            <td className='action_div'>
                                <NavLink to={`/edit-movies-form/${dat.id}`}>
                                    <button>Edit</button>
                                </NavLink>
                                <li>Delete</li>
                            </td>
                        </tr> 
                    )
                })}
            </tbody>
        </table> */}
    </div>
  )
}

export default EditMovies