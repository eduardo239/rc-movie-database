import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMovies } from '../store/movies';
import Feature from './Feature';
import Top from './Top';
import News from './News';
import Footer from './Footer';

const Init = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      await dispatch(getMovies());
    })();
  }, [dispatch]);

  return (
    <div>
      <Feature />
      <Top />
      <News />
      <Footer />
    </div>
  );
};

export default Init;
