import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMovie, pageViewInc } from '../store/movies';
import { extractVideoId } from '../helper';
import { ReactComponent as Back } from '../assets/icons2/mdi_arrow-left.svg';
import { ReactComponent as AddIcon } from '../assets/icons2/mdi_bookmark-plus-outline.svg';
import { ReactComponent as WillIcon } from '../assets/icons2/mdi_calendar-clock.svg';
import { ReactComponent as HaveIcon } from '../assets/icons2/mdi_eye-plus-outline.svg';
import { ReactComponent as FavIcon } from '../assets/icons2/mdi_star-outline.svg';
import { loadWatchlist, addToWatchlist } from '../store/user';
import Loading from './Loading';
import poster from '../assets/images/poster.jpg';
import Message from './Message';

const MoviePage = () => {
  let { id } = useParams();
  let history = useHistory();
  const dispatch = useDispatch();

  const [showWatchlists, setShowWatchlists] = useState(false);

  const [helperText, setHelperText] = useState({
    error: null,
    text: null,
    type: null,
  });

  const { data, loading } = useSelector((state) => state.movies.movie);
  const { data: loginData } = useSelector((state) => state.user.login);
  const { data: watchlistData } = useSelector((state) => state.user.watchlist);

  const back = () => history.goBack();

  const handleAddWatchlist = async (watchlist_id) => {
    const response = await dispatch(addToWatchlist(data.id, watchlist_id));
    console.log(response);
    if (response) {
      setHelperText({
        error: true,
        text: response.message,
        type: 'alert-error',
      });
    } else {
      setHelperText({
        error: false,
        text: 'Item successfully added.',
        type: 'alert-success',
      });
    }
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
            {!!helperText.text && (
              <Message data={helperText.text} type={helperText.type} />
            )}
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
              <div className='relative flex flex-column'>
                <button
                  className='btn-inline mb-1'
                  onClick={handleShowWatchlist}
                >
                  <AddIcon /> Add to watchlist
                </button>
                {showWatchlists &&
                  watchlistData &&
                  watchlistData.map((w) => (
                    <button
                      className='btn-inline btn-info mb-1'
                      key={w.id}
                      onClick={() => handleAddWatchlist(w.id)}
                    >
                      {w.name}
                    </button>
                  ))}
                <button className='btn-inline btn-success mb-1'>
                  <WillIcon /> Will watch
                </button>
                <button className='btn-inline btn-error mb-1'>
                  <HaveIcon /> Watched
                </button>
                <button className='btn-inline btn-warning mb-1'>
                  <FavIcon /> Add to favorite
                </button>
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
