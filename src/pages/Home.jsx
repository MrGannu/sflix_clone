import React, { useContext } from 'react'
import Movie from '../components/Movie'
import Carousel from '../components/Carousel'
import Latest from '../components/Latest'

const Home = ({_movie}) => {
  return (
    <div className='home_div'>
      <Carousel _movie={_movie}/>
      <Movie _movie={_movie} />
      <Latest _movie={_movie} />
    </div>
  )
}

export default Home