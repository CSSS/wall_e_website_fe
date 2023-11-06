import React from 'react';

import '../stylesheets/Navbar.css';

function Navbar(props) {
  const { leading, center, trailing } = props;

  return (
    <>
      <div className='navbar'>
        <div className='leading'>{leading}</div>
        <div className='center'>{center}</div>
        <div className='trailing'>{trailing}</div>
      </div>
      <div className='navbarSpacer'></div>
    </>
  );
}

export default Navbar;
