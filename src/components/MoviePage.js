import React, { useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMovie, pageViewInc } from '../store/movies';
import { dateConvert, extractVideoId } from '../helper';
import Loading from './Loading';
import poster from '../assets/images/poster.jpg';
import { ReactComponent as Back } from '../assets/icons2/mdi_arrow-left.svg';

const MoviePage = () => {
  let { id } = useParams();
  let history = useHistory();
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.movies.movie);

  const back = () => history.goBack();

  useEffect(() => {
    (async function () {
      await dispatch(getMovie(id));
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
              <Back /> Back
            </button>

            <h2>{data.name}</h2>
            <p className='text-small'>
              Year: {data.year} - Views: {data.views || 0} -{' '}
              {dateConvert(data.created_at)}
            </p>
            <div className='flex'>
              <div className='relative'>
                <div>
                  <img
                    className='poster'
                    src={data.poster || poster}
                    alt={data.name}
                  />
                  <div className='App-card-watchlist'>
                    <button className='btn btn-success'>watched</button>
                    <button className='btn btn-info'>will</button>
                    <button className='btn btn-warning'>favorite</button>
                    <button className='btn btn-error'>add to watchlist</button>
                  </div>
                </div>
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
            <div className='App-tags mt-3'>
              {data.tags &&
                data.tags.map((x, i) => (
                  <Link to={`../genre/${x.trim()}`} key={i}>
                    <span>{x}</span>
                  </Link>
                ))}
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

export default MoviePage;
