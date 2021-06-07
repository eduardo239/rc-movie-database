import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMovies } from '../store/movies';
import Feature from './Feature';
import TopMovie from './TopMovie';
import NewMovie from './NewMovie';
import Slide from './Slide';

const Init = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      await dispatch(getMovies());
    })();
  }, [dispatch]);

  return (
    <>
      {/* <Feature /> */}
      <Slide />
      <TopMovie />
      <NewMovie />
    </>
  );
};

export default Init;
