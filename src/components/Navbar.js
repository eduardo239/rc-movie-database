import React, { useState } from 'react';
import { supabase } from '../lib/api';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactComponent as LogoutIcon } from '../assets/icons2/mdi_logout.svg';
import { ReactComponent as ProfileIcon } from '../assets/icons2/mdi_face-man-profile.svg';
import { ReactComponent as MenuIcon } from '../assets/icons2/mdi_menu.svg';
import { ReactComponent as CloseIcon } from '../assets/icons2/mdi_close.svg';
import Search from './Search';
import Logo from './Logo';
// import { routingTo } from '../helper';

const Navbar = () => {
  const [modal, setModal] = useState(false);
  const { data } = useSelector((state) => state.user.login);
  // let history = useHistory();

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
    <div className='container mt-3'>
      <div className='row flex flex-align-center '>
        <div className='col-lg-2 col-md-6 col-sm-6 flex flex-justify-start order-lg-0 order-0 flex-justify-center--sm'>
          <Logo />
        </div>
        {/*  */}
        <div className='col-lg-6 order-lg-1 order-2 mt-lg-0 mt-2'>
          <Search />
        </div>
        {/*  */}
        <div className='col-lg-4 col-md-6 col-sm-6 flex flex-align-center flex-justify-end order-lg-2 order-1 gap-2 flex-justify-center--sm mt-2 mt-sm-0'>
          <div
            className='svg-hover flex flex-align-center'
            onClick={handleOpenMenu}
            style={{ cursor: 'pointer' }}
          >
            <MenuIcon />
            Menu
          </div>

          {data && (
            <Link className='btn-primary svg-icon' to={`/profile/${data.id}`}>
              <ProfileIcon />
            </Link>
          )}

          <div>
            <button className='btn-icon btn-transparent' onClick={handleLogout}>
              <LogoutIcon />
            </button>
          </div>
          {/* --- */}
          {modal && (
            <div className='App-menu-modal'>
              <div className='App-menu-button--close'>
                <button className='btn' onClick={handleCloseMenu}>
                  <CloseIcon />
                </button>
              </div>
              {/*  */}
              <div>
                <h2>Menu</h2>
                <ul className='App-menu-content App-fadeIn mt-3'>
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
      </div>
      <br />
    </div>
  );
};

export default Navbar;
