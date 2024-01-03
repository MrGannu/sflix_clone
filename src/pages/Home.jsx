import React, { useContext } from 'react'
import Movie from '../components/Movie'
import Carousel from '../components/Carousel'
import Latest from '../components/Latest'

const Home = ({_movie}) => {
  return (
    <div className='home_div'>
      <Carousel/>
      <Movie _movie={_movie} />
      <Latest/>
    </div>
  )
}

export default Home