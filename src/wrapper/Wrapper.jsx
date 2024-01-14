import React from 'react';
import "../styles/wrapper.css";

const Wrapper = ({ state, setState, children }) => {
  const handleOnClick = () => {
    setState(!state);
  };

  return (
    <>
      <div className='wrapper' onClick={handleOnClick}></div>
      {children}
    </>
  );
};

export default Wrapper;
