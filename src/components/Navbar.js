import React, { useState } from 'react';
import { supabase } from '../lib/api';
import { Link } from 'react-router-dom';
import Search from './Search';
import Logo from './Logo';

const Navbar = () => {
  const [modal, setModal] = useState(false);

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
    <div className='flex align-center my-3 gap-2'>
      <Logo />
      <Search />

      <div className='App-menu svg-hover' onClick={handleOpenMenu}>
        <svg
          style={{ cursor: 'pointer' }}
          width='24'
          height='24'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M3 6H21V8H3V6ZM3 11H21V13H3V11ZM3 16H21V18H3V16Z'
            fill='#F7F7F9'
          />
        </svg>
      </div>
      <div>
        <button className='btn btn-secondary' onClick={handleLogout}>
          Logout
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
            <div className='flex' style={{ gap: '1rem' }}>
              <ul className='App-menu-content mt-3'>
                <h3>Movies</h3>
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
              {/*  */}
              <ul className='App-menu-content mt-3'>
                <h3>Tv</h3>
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
        </div>
      )}
    </div>
  );
};

export default Navbar;
