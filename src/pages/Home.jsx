import React, { useContext } from 'react'
import Movie from '../components/Movie'
import Carousel from '../components/Carousel'
import Latest from '../components/Latest'

const Home = () => {
  return (
    <div className='home_div'>
      <Carousel/>
      <Movie/>
      <Latest/>
    </div>
  )
}

export default Home