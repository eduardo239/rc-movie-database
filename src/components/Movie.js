import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../store/movies';
import Loading from './Loading';
import MovieItem from './MovieItem';

const Movie = () => {
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.movies.movies);

  useEffect(() => {
    (async function () {
      await dispatch(getMovies());
    })();
  }, [dispatch]);

  return (
    <>
      <div className='flex wrap gap-1 justify-center'>
        {loading ? (
          <Loading />
        ) : data ? (
          data.map((m) => <MovieItem key={m.id} data={m} />).reverse()
        ) : (
          <p>movies not found</p>
        )}
      </div>
    </>
  );
};

export default Movie;
