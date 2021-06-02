import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg';

const Logo = () => {
  return (
    <Link to='/'>
      <div className='App-logo'>
        <img src={logo} alt='movie database' />
      </div>
    </Link>
  );
};

export default Logo;
