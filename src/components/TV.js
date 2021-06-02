import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTvs } from '../store/tvs';
import Loading from './Loading';
import TvItem from './TvItem';

const TV = () => {
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.tvs.tvs);

  useEffect(() => {
    (async function () {
      await dispatch(getTvs());
    })();
  }, [dispatch]);

  return (
    <div className='App-flex wrap'>
      {loading ? (
        <Loading />
      ) : data ? (
        data.map((m) => <TvItem key={m.id} data={m} />).reverse()
      ) : (
        <p>tv show not found</p>
      )}
    </div>
  );
};

export default TV;
