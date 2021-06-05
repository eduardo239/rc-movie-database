import React, { useState } from 'react';
import { supabase } from '../lib/api';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactComponent as EmailIcon } from '../assets/icons2/mdi_arrow-left.svg';
import { ReactComponent as AtIcon } from '../assets/icons2/mdi_at.svg';

import Search from './Search';
import Logo from './Logo';

const Navbar = () => {
  const [modal, setModal] = useState(false);
  const { data } = useSelector((state) => state.user.login);

  const handleLogout = async () => {
    setModal(false);
    supabase.auth.signOut().catch(console.error);
  };

  const handleOpenMenu = () => {
    setModal(true);
  };

  const handleCloseMenu = () => {
    setModal(false);
  };

  return (
    <div className='flex flex-align-center my-3 gap-2'>
      <Logo />
      <Search />

      {data && (
        <div>
          <Link to={`profile/${data.id}`}>
            <AtIcon />
          </Link>
        </div>
      )}

      <div
        className='flex flex-align-center svg-hover'
        onClick={handleOpenMenu}
        style={{ cursor: 'pointer' }}
      >
        <svg
          className='me-2'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M3 6H21V8H3V6ZM3 11H21V13H3V11ZM3 16H21V18H3V16Z'
            fill='#F7F7F9'
          />
        </svg>{' '}
        <span>Menu</span>
      </div>
      <div>
        <button className='btn-icon btn-secondary' onClick={handleLogout}>
          <EmailIcon />
        </button>
      </div>
      {/* --- */}
      {modal && (
        <div className='App-menu-modal'>
          <div className='App-menu-button--close'>
            <button className='btn' onClick={handleCloseMenu}>
              <svg width='24' height='24' fill='none' viewBox='0 0 24 24'>
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
                  d='M17.25 6.75L6.75 17.25'
                />
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
                  d='M6.75 6.75L17.25 17.25'
                />
              </svg>
            </button>
          </div>
          {/*  */}
          <div>
            <h2>Menu</h2>
            <ul className='App-menu-content mt-3'>
              <h3 className='my-4 before'>Movies</h3>
              <li>
                <Link to='/' onClick={handleCloseMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/movies' onClick={handleCloseMenu}>
                  Movies
                </Link>
              </li>
              <li>
                <Link to='/tv' onClick={handleCloseMenu}>
                  TV
                </Link>
              </li>
              <li>
                <Link to='/add' onClick={handleCloseMenu}>
                  Add
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
