import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMovies } from '../store/movies';
import Feature from './Feature';
import TopMovie from './TopMovie';
import NewMovie from './NewMovie';
import TopTv from './TopTv';
import NewTv from './NewTv';

const Init = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      await dispatch(getMovies());
    })();
  }, [dispatch]);

  return (
    <>
      <Feature />
      <TopMovie />
      <NewMovie />
      <TopTv />
      <NewTv />
    </>
  );
};

export default Init;
