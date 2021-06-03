import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTv, pageViewInc } from '../store/tvs'; // TODO: pageView
import { dateConvert, extractVideoId } from '../helper';
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
      await dispatch(pageViewInc(id));
    })();
  }, [dispatch, id]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        data && (
          <div>
            <button className='btn-inline' onClick={back}>
              back
            </button>

            <h2>{data.name}</h2>
            <p className='text-small'>
              Year: {data.year} - Views: {data.views || 0} -{' '}
              {dateConvert(data.created_at)}
            </p>
            <div className='flex'>
              <div>
                <img
                  className='poster'
                  src={data.poster || poster}
                  alt={data.name}
                />
              </div>
              <div className='videoContainer'>
                <div className='videoWrapper'>
                  <iframe
                    title='YouTube video player'
                    frameBorder='0'
                    allowFullScreen
                    width='560'
                    height='349'
                    src={extractVideoId(data.trailer || '')}
                  ></iframe>
                </div>
              </div>
            </div>
            <h3 className='mt-4 pb-3 before'>Storyline</h3>

            <div className='App-details'>
              <p>{data.storyline}</p>
            </div>

            <h3 className='mt-4 pb-3 before'>Details</h3>

            <div className='App-details'>
              <p>
                <b>Director:</b>
                {data.director}
              </p>

              <p>
                <b>Stars:</b>
                {data.cast}
              </p>

              <p>
                <b>Year:</b>
                {data.year}
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default TvPage;
