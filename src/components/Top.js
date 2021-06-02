import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/api';
import poster from '../assets/images/poster.jpg';
import Loading from './Loading';

const Top = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    (async function () {
      setLoading(true);
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .limit(5);
      if (error) console.error(error);
      else setData(data);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <h2>Top 10</h2>
      <div className='flex wrap gap-1'>
        {loading ? (
          <Loading />
        ) : (
          data &&
          data.map((i) => (
            <Link
              to={`movies/${i.id}`}
              key={i.id}
              className='App-card-container'
            >
              <div className='App-card'>
                <img src={data.poster || poster} alt={i.name} />
                <div className='p-2'>
                  <h5>{i.name}</h5>
                  <p className='App-card--p text-small mt-2'>
                    {i.storyline.slice(0, 60) + '...' || 'No storyline'}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export default Top;
