import React from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const handleLogout = () => {
        localStorage.removeItem('userData'); // Remove the item from local storage
        window.location.reload();
      };
  return (
    <>
      <h3>Welcome !</h3>
        <li>
          <img src="/images/profile_user.png" alt="" />
          <span>Profile</span>
        </li>
        <li>
          <img src="/images/profile_settings.png" alt="" />
          <span>Settings</span>
        </li>
        <li>
          <img src="/images/lock.png" alt="" />
          <span>Lock Screen</span>
        </li>
        <li onClick={handleLogout}>
          <img src="/images/logout.png" alt="" />
          <span>Logout</span>
        </li>
    </>
  )
}

export default Profile