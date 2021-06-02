import React from 'react';
import { Link } from 'react-router-dom';
import fbIcon from '../assets/icons2/mdi_facebook2.svg';
import inIcon from '../assets/icons2/mdi_instagram.svg';
import twIcon from '../assets/icons2/mdi_twitch.svg';
import ttIcon from '../assets/icons2/mdi_twitter.svg';
const Footer = () => {
  return (
    <footer>
      <div className='text-center'>
        <h3 className='my-3'> Logo</h3>
        <div className='flex gap-2 justify-center'>
          <img src={fbIcon} alt='Facebook' />
          <img src={inIcon} alt='Instagram' />
          <img src={ttIcon} alt='Twitter' />
          <img src={twIcon} alt='Twitch' />
        </div>
        <div className='flex gap-2 mt-2 justify-center'>
          <Link to='/'>Home</Link>
          <Link to='/movies'>Movies</Link>
          <Link to='/tv'>Tv</Link>
          <Link to='/add'>Add</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
