import React from 'react'

const Search = ({filteredMovies}) => {
    
  return (

    <div className='movie_div'>
      <div className="movie_cards">
        {filteredMovies.slice(0, 12).map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  )
}

export default Search