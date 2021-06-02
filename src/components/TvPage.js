import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTv } from '../store/tvs';
import Loading from './Loading';
import poster from '../assets/images/poster.jpg';

const TvPage = () => {
  let { id } = useParams();
  let history = useHistory();
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.tvs.tv);

  const back = () => history.goBack();

  useEffect(() => {
    (async function () {
      await dispatch(getTv(id));
    })();
  }, [dispatch, id]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        data && (
          <div>
            <button className='btn btn-error' onClick={back}>
              back
            </button>
            <h1>{data.name}</h1>
            <img src={poster} alt={data.name} />
            <small>{data.year}</small>
            <p>{data.storyline}</p>
          </div>
        )
      )}
    </div>
  );
};

export default TvPage;
