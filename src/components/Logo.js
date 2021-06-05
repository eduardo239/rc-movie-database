import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg';

const Logo = () => {
  return (
    <Link to='/'>
      <div className='flex-justify-center flex'>
        <img src={logo} alt='movie database' />
      </div>
    </Link>
  );
};

export default Logo;
