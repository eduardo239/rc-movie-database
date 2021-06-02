import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMovie } from '../store/movies';
import Loading from './Loading';
import poster from '../assets/images/poster.jpg';

const MoviePage = () => {
  let { id } = useParams();
  let history = useHistory();
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.movies.movie);

  const back = () => history.goBack();

  useEffect(() => {
    (async function () {
      await dispatch(getMovie(id));
      // await dispatch(pageViewInc(id));
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
            <div className='App-page'>
              <div>
                <img src={poster} alt={data.name} />
                <p className='text-small'>Year: {data.year}</p>
              </div>
              <div className='flex wrap'>
                <iframe
                  width='560'
                  height='315'
                  src='https://www.youtube.com/embed/klBqUiUFVhw'
                  title='YouTube video player'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className='m-md-0 mt-4'>Storyline</h3>

              <div className='App-details'>
                <p>{data.storyline}</p>
              </div>

              <h3 className='m-md-0 mt-4'>Details</h3>

              <div className='App-details'>
                <p>
                  <b>Director</b>
                  {data.director}
                </p>

                <p>
                  <b>Stars</b>
                  {data.cast}
                </p>

                <p>
                  <b>Year</b>
                  {data.year}
                </p>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default MoviePage;
