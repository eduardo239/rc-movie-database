import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMovies } from '../store/movies';
import Card from './Card';
import Loading from './Loading';

const Movie = () => {
  const dispatch = useDispatch();

  const [type, setType] = useState('movie');

  const { data, loading } = useSelector((state) => state.movies.movies);

  const handleType = async () => setType(!type);

  useEffect(() => {
    (async function () {
      await dispatch(getMovies());
    })();
  }, [dispatch]);

  return (
    <>
      <h2>Movies by Type</h2>
      <section className='mb-3'>
        <button className='btn-inline btn-primary me-1' onClick={handleType}>
          Movies
        </button>
        <button className='btn-inline btn-secondary' onClick={handleType}>
          Tv
        </button>
      </section>
      <h2>Movies</h2>
      <div className='flex wrap gap-1 flex-justify-center'>
        {loading ? (
          <Loading />
        ) : data ? (
          data
            .map((i) => (
              <Link to={`movies/${i.id}`} key={i.id} className='flex'>
                <Card
                  name={i.name}
                  storyline={i.storyline}
                  date={i.year}
                  poster={i.poster}
                />
              </Link>
            ))
            .reverse()
        ) : (
          <p>movies not found</p>
        )}
      </div>
    </>
  );
};

export default Movie;
