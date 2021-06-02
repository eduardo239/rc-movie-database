import React from 'react';
import Slide from './Slide';
import { useSelector } from 'react-redux';
import Loading from './Loading';

const Feature = () => {
  const { data, loading } = useSelector((state) => state.movies.movies);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : data && data.length > 3 ? (
        <Slide data={data && data.slice(1, 4)} />
      ) : (
        <p>Movies not found</p>
      )}
    </div>
  );
};

export default Feature;
