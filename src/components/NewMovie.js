import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/api';
import Loading from './Loading';
import Card from './Card';

const NewMovie = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    (async function () {
      setLoading(true);
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .limit(5)
        .order('created_at', { ascending: false });
      if (error) console.error(error);
      else setData(data);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <h2 className='mt-5'>News</h2>
      <div className='flex wrap gap-1 flex-justify-center'>
        {loading ? (
          <Loading />
        ) : (
          data &&
          data.map((i) => (
            <Link to={`movies/${i.id}`} key={i.id} className='flex'>
              <Card
                name={i.name}
                storyline={i.storyline}
                date={i.year}
                poster={i.poster}
              />
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export default NewMovie;
