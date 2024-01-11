import React from 'react'

const Profile = () => {
    const handleLogout = () => {
        localStorage.removeItem('userData'); // Remove the item from local storage
        window.location.reload();
      };
  return (
    <>
      <h3>Welcome !</h3>
        <li className='profile_li'>
          <img src="/images/profile_user.png" alt="" />
          <span>Profile</span>
        </li>
        <li className='profile_li'>
          <img src="/images/profile_settings.png" alt="" />
          <span>Settings</span>
        </li>
        <li className='profile_li'>
          <img src="/images/lock.png" alt="" />
          <span>Lock Screen</span>
        </li>
        <li className='profile_li' onClick={handleLogout}>
          <img src="/images/logout.png" alt="" />
          <span>Logout</span>
        </li>
    </>
  )
}

export default Profile