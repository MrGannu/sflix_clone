import React, { useState } from 'react'
import "../styles/header.css"
import { NavLink } from 'react-router-dom'
import Login from '../auth/Login'
import Sidebar from './Sidebar'
import Profile from '../dropdowns/Profile'

const Header = ({setSearchQuery, handleSearch}) => {
  const [login, setLogin] = useState(false)
  const [profile, setProfile] = useState(false)
  const [sidebar, setSidebar] = useState(false)
  const user = JSON.parse(localStorage.getItem('userData'))

  return (
    <div className='header_div'>
      <div className="herder_left">
        <NavLink to="/">
          <img className='movie_logo' src="/images/movie_logo.png" alt="logo-img" />
        </NavLink>
        <div className="menu" onClick={()=>setSidebar(!sidebar)}>
          <img src="/images/menu.png" alt="menu-img" />
          <span>Browse</span>
        </div>
          <div className="search">
            <form className='search_form' onSubmit={handleSearch}>
                <img src="/images/search.png" alt="search-img" />
                <input type="text" placeholder='Enter keywords...' onChange={(e) => setSearchQuery(e.target.value)}/>
                <button type='submit' hidden></button>
            </form>
          </div>
      </div>
      <div className="herder_right" >
        {
          user ? 
          <>
            <img className='loggedin_user_img' src="/images/loggedin_user.png" alt="user-logo" onClick={()=>setProfile(!profile)} />
          </>
          :
          <div className='login' onClick={()=>setLogin(!login)}>
            <img src="/images/user.png" alt="user-logo"  />
            <span>login</span>
          </div> 
        }
        {profile && 
          <div className="profile_div">
            <Profile setProfile={setProfile} profile={profile}/>
          </div>
        }
      </div>
      {login && <Login setLogin={setLogin} login={login}/>}
      {sidebar && <Sidebar setSidebar={setSidebar}/>}
    </div>
  )
}

export default Header