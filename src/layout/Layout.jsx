import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Search from '../components/Search';

const Layout = ({setSearchQuery, searchQuery, searchData}) => {
  return (
    <div className='layout_div'>
      <Header setSearchQuery={setSearchQuery}/>
      {searchQuery ? <Search searchData={searchData} searchQuery={searchQuery}/> : <Outlet />}
      <Footer />
    </div>
  );
};

export default Layout;
