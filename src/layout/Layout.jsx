import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Search from '../components/Search';
import Alert from '../alerts/Alert';
import "../index.css"

const Layout = ({setSearchQuery, searchQuery, searchData}) => {
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState({
    type: "",
    message: ""
  })

  return (
    <div className='layout_div'>
      {alert && <Alert alertMessage={alertMessage}/>}
      <Header setSearchQuery={setSearchQuery} setAlert={setAlert} setAlertMessage={setAlertMessage}/>
      <div className="layout_main_div">
        {searchQuery ? <Search searchData={searchData} searchQuery={searchQuery}/> : <Outlet />}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
