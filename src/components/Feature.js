import React from 'react';
import Slide from './Slide2';
import { useSelector } from 'react-redux';
import Loading from './Loading';
import Message from './Message';

const Feature = () => {
  const { data, loading } = useSelector((state) => state.movies.movies);

  return (
    <>
      {loading ? (
        <Loading />
      ) : data && data.length > 3 ? (
        <Slide data={data && data.slice(1, 4)} />
      ) : (
        <Message data='Slide not found.' type='alert-info' />
      )}
    </>
  );
};

export default Feature;
