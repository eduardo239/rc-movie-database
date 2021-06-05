import React from 'react';
import { Link } from 'react-router-dom';
import poster from '../assets/images/poster.jpg';

const MovieItem = ({ data }) => {
  return (
    <Link to={`movies/${data.id}`} className='App-card-container'>
      <div className='App-card'>
        <img className='poster' src={data.poster || poster} alt={data.name} />
        <div className='p-2'>
          <h5>{data.name}</h5>
          <p className='App-card--p text-small mt-2'>
            {data?.storyline
              ? data.storyline.slice(0, 60) + '...'
              : 'No storyline'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieItem;
