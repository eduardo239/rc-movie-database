import React from 'react';
import poster_default from '../assets/images/poster.jpg';

const Card = ({ name, storyline, date, poster }) => {
  return (
    <div className='App-card-2'>
      <img className='poster' src={poster || poster_default} alt={name} />
      <section>
        <h4>{name}</h4>
        <p>{storyline?.slice(0, 40) + '...' || 'No storyline'}</p>
        <small>{date}</small>
      </section>
    </div>
  );
};

export default Card;
