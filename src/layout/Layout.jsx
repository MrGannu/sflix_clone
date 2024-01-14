import React, { useState } from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Search from '../components/Search';
import Alert from '../alerts/Alert';

const Layout = ({setSearchQuery, searchQuery, searchData}) => {
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  return (
    <div className='layout_div'>
      {alert && <Alert alertMessage={alertMessage}/>}
      <Header setSearchQuery={setSearchQuery} setAlert={setAlert} setAlertMessage={setAlertMessage}/>
      {searchQuery ? <Search searchData={searchData} searchQuery={searchQuery}/> : <Outlet />}
      <Footer />
    </div>
  );
};

export default Layout;
