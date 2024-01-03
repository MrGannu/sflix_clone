import React from 'react'
import "../styles/sidebar.css"
import { NavLink } from 'react-router-dom'

const Sidebar = ({setSidebar}) => {
  const user = JSON.parse(localStorage.getItem('userData'))

  return (
    <div className='sidebar_div' onClick={()=>setSidebar(false)}>
      <div className="side_drawer">
        <div className="return_back">
          <img src="/images/back.png" alt="" />
        </div>
        <div className="sidebar_nav_links">
          <ul>
            <NavLink className="navlink" to="/">
              <li>
                <img src="/images/home.png" alt="" />
                <span>Home</span>
              </li>
            </NavLink>
            {user ? 
              <NavLink className="navlink" to="/create-movies">
                <li>
                  <img src="/images/create.png" alt="" />
                  <span>Add Movies</span>
                </li>
              </NavLink> 
              :
              ""
             }
            <li>
              <img className='movie_play_dark' src="/images/play-dark.png" alt="" />
              <span>Movies</span>
            </li>
            <li>
              <img src="/images/video.png" alt="" />
              <span>TV Shows</span>
            </li>
            <li>
              <img src="/images/fire.png" alt="" />
              <span>Top IMDB</span>
            </li>
            <li>
              <img src="/images/android.png" alt="" />
              <span>Android App</span>
            </li>
          </ul>
        </div>
        <div className="genre">
          <div className="genre_heading">
            <p>GENRE</p>
          </div>
          <div className="genre_tags">
            <p>Action</p>
            <p>Action & Adveture</p>
            <p>Adveture</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar