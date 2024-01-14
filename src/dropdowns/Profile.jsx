import React, { useEffect } from 'react';

const Profile = ({ setLogin, setProfile, setAlert, setAlertMessage }) => {
  const handleLogout = () => {
    localStorage.removeItem('userData');
    setAlert(true);
    setAlertMessage({
      type: "success",
      message: 'Logout Successful'
    });
    setLogin(true);
    setProfile(false);

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
  );
};

export default Profile;
