import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMovie, pageViewInc } from '../store/movies';
import { dateConvert, extractVideoId } from '../helper';
import { ReactComponent as Back } from '../assets/icons2/mdi_arrow-left.svg';
import { loadWatchlist, addToWatchlist } from '../store/user';
import Loading from './Loading';
import poster from '../assets/images/poster.jpg';

const MoviePage = () => {
  let { id } = useParams();
  let history = useHistory();
  const dispatch = useDispatch();

  const [showWatchlists, setShowWatchlists] = useState(false);

  const { data, loading } = useSelector((state) => state.movies.movie);
  const { data: loginData } = useSelector((state) => state.user.login);
  const { data: watchlistData } = useSelector((state) => state.user.watchlist);

  const back = () => history.goBack();

  const handleAddWatchlist = (watchlist_id) => {
    dispatch(addToWatchlist(loginData.id, data.id, watchlist_id));
    return;
  };

  const handleShowWatchlist = () => {
    setShowWatchlists(!showWatchlists);
  };

  useEffect(() => {
    (async function () {
      if (id) {
        await dispatch(getMovie(id));
        await dispatch(pageViewInc(id));
      }
      if (loginData) {
        await dispatch(loadWatchlist(loginData.id));
      }
    })();
  }, [dispatch, id, loginData]);

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
              Year: {data.year} - Views: {data.views || 0} - {data.year}
            </p>
            <div className='flex'>
              <div>
                <img
                  className='poster'
                  src={data.poster || poster}
                  alt={data.name}
                />
              </div>
              <div style={{ display: 'none' }} className='videoContainer'>
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
              <div className='flex-0'>
                <div className='relative'>
                  <button
                    className='btn btn-inline m-1'
                    onClick={handleShowWatchlist}
                  >
                    Add to watchlist
                  </button>
                  {showWatchlists &&
                    watchlistData &&
                    watchlistData.map((w) => (
                      <button
                        className='btn btn-inline btn-warning m-1'
                        key={w.id}
                        onClick={() => handleAddWatchlist(w.id)}
                      >
                        {w.name}
                      </button>
                    ))}
                  <button className='btn btn-inline m-1'>Will watch</button>
                  <button className='btn btn-inline m-1'>Watched</button>
                  <button className='btn btn-inline m-1'>
                    Add to favorite
                  </button>
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
