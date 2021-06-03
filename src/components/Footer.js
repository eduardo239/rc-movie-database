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
        <div className='flex gap-2 mt-4 justify-center'>
          <a href='#facebook'>
            <img className='App-footer-icon' src={fbIcon} alt='Facebook' />
          </a>
          <a href='#instagram'>
            <img className='App-footer-icon' src={inIcon} alt='Instagram' />
          </a>
          <a href='#twitter'>
            <img className='App-footer-icon' src={ttIcon} alt='Twitter' />
          </a>
          <a href='#twitch'>
            <img className='App-footer-icon' src={twIcon} alt='Twitch' />
          </a>
        </div>
        <div className='flex gap-2 mt-4 justify-center'>
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
