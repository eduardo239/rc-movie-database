import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ReactComponent as Back } from '../assets/icons2/mdi_arrow-left.svg';
import { supabase } from '../lib/api';
import poster from '../assets/images/poster.jpg';
import Card from './Card';

const GenrePage = () => {
  let { term } = useParams();
  let history = useHistory();

  const [movies, setMovies] = useState();

  const back = () => history.goBack();

  useEffect(() => {
    (async function () {
      let { data: movies } = await supabase
        .from('movies')
        .select('*')
        .cs('tags', [term]);

      await setMovies(movies);
    })();
  }, [term]);

  return (
    <div>
      <div>
        <button className='btn-inline' onClick={back}>
          <Back /> Back
        </button>
      </div>
      <h2>Movies</h2>

      <div className='flex wrap gap-1 flex-justify-center'>
        {movies &&
          movies.map((i) => (
            <Link to={`../movies/${i.id}`} key={i.id} className='flex'>
              <Card
                name={i.name}
                storyline={i.storyline}
                date={i.year}
                poster={i.poster}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default GenrePage;
