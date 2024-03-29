import React, { useEffect, useState } from 'react'
import "../styles/header.css"
import { NavLink } from 'react-router-dom'
import Login from '../auth/Login'
import Sidebar from './Sidebar'
import Profile from '../dropdowns/Profile'
import Wrapper from '../wrapper/Wrapper'

const Header = ({setSearchQuery, handleSearch, setAlert, setAlertMessage}) => {
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
      <div className="herder_right"  >
        {
          user ? 
          <>
            <img className='loggedin_user_img' src="/images/loggedin_user.png" alt="user-logo" onClick={()=>setProfile(!profile)} />
          </>
          :
          <div className='login' onClick={() => {setLogin(!login); setAlert(false);}}>
            <img src="/images/user.png" alt="user-logo"  />
            <span>login</span>
          </div> 
        }
        {profile && (
          <>
          <Wrapper state={profile} setState={setProfile} ></Wrapper>
            <div className="profile_div">
              <Profile setLogin={setLogin} setProfile={setProfile} setAlert={setAlert} setAlertMessage={setAlertMessage}/>
            </div>
          </>
        )}
      </div>
      {login && <Login setLogin={setLogin} login={login} setAlert={setAlert} setAlertMessage={setAlertMessage}/>}
      {sidebar && <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>}
    </div>
  )
}

export default Header