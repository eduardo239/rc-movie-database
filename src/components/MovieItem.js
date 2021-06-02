import React from 'react';
import { Link } from 'react-router-dom';
import poster from '../assets/images/poster.jpg';

const MovieItem = ({ data }) => {
  return (
    <div>
      <Link to={`movies/${data.id}`}>
        <div className='App-card'>
          <img src={poster} alt='' />
          <div className='App-card--body'>
            <p>{data.name}</p>
            <small>{data.year}</small>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieItem;
