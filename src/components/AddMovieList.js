import React, { useEffect, useState } from 'react';
import { deleteMovie, getMovies } from '../store/movies';
import { deleteTv, getTvs } from '../store/tvs';
import { useDispatch, useSelector } from 'react-redux';
import { helperFunction } from '../helper';
import Loading from './Loading';
import Message from './Message';

const AddMovieList = ({ loadMovie }) => {
  const dispatch = useDispatch();

  const [helperText, setHelperText] = useState({
    error: false,
    text: '',
    type: '',
  });

  const { data: tvs, loading } = useSelector((state) => state.tvs.tvs);
  const { data: movies } = useSelector((state) => state.movies.movies);

  const handleDelete = async (id, type) => {
    try {
      if (type === 'movie') {
        await dispatch(deleteMovie(id));
        helperFunction(
          {
            error: false,
            text: 'Movie successfully deleted.',
            type: 'alert-success',
          },
          setHelperText
        );
      } else if (type === 'tv') {
        await dispatch(deleteTv(id));
        helperFunction(
          {
            error: false,
            text: 'Tv Show successfully deleted.',
            type: 'alert-success',
          },
          setHelperText
        );
      }
    } catch (error) {
      helperFunction(
        {
          error: true,
          text: error.message,
          type: 'alert-error',
        },
        setHelperText
      );
    } finally {
      await dispatch(getMovies());
      await dispatch(getTvs());
    }
  };

  useEffect(() => {
    (async function () {
      await dispatch(getMovies());
      await dispatch(getTvs());
    })();
  }, [dispatch]);

  return (
    <div className='mt-4'>
      <h2>Movie List</h2>

      {!!helperText.text && (
        <Message data={helperText.text} type={helperText.type} />
      )}

      {loading && <Loading />}

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>year</th>
            <th>storyline</th>
            <th>tags</th>
            <th>image</th>
            <th>cast</th>
            <th>options</th>
          </tr>
        </thead>
        {tvs ? (
          tvs
            .map((i) => (
              <tbody key={i.id}>
                <tr>
                  <td>{i.id.slice(0, 4) + '...'}</td>
                  <td>{i.name}</td>
                  <td>{i.year}</td>
                  <td>{i.storyline ? i.storyline.slice(0, 10) + '...' : ''}</td>
                  <td>{i.tags && i.tags.join(', ')}</td>
                  <td>
                    {i.image ? (
                      <a target='_blank' rel='noreferrer' href={`${i.image}`}>
                        url
                      </a>
                    ) : (
                      'null'
                    )}
                  </td>
                  <td>{i.cast}</td>
                  <td>
                    <div className='flex'>
                      <button
                        className='btn btn-error'
                        onClick={() => handleDelete(i.id, 'tv')}
                      >
                        <svg
                          width='24'
                          height='24'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='1.5'
                            d='M17.25 6.75L6.75 17.25'
                          />
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='1.5'
                            d='M6.75 6.75L17.25 17.25'
                          />
                        </svg>
                      </button>
                      <button
                        className='btn btn-warning'
                        onClick={() => loadMovie(i)}
                      >
                        <svg
                          width='24'
                          height='24'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='1.5'
                            d='M4.75 19.25L9 18.25L18.2929 8.95711C18.6834 8.56658 18.6834 7.93342 18.2929 7.54289L16.4571 5.70711C16.0666 5.31658 15.4334 5.31658 15.0429 5.70711L5.75 15L4.75 19.25Z'
                          />
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='1.5'
                            d='M19.25 19.25H13.75'
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))
            .reverse()
        ) : (
          <tbody>
            <tr>
              <td>Movies not found</td>
            </tr>
          </tbody>
        )}
      </table>
      {/*  */}

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>year</th>
            <th>storyline</th>
            <th>tags</th>
            <th>image</th>
            <th>cast</th>
            <th>options</th>
          </tr>
        </thead>
        {movies ? (
          movies
            .map((i) => (
              <tbody key={i.id}>
                <tr>
                  <td>{i.id.slice(0, 4) + '...'}</td>
                  <td>{i.name}</td>
                  <td>{i.year}</td>
                  <td>{i.storyline ? i.storyline.slice(0, 10) + '...' : ''}</td>
                  <td>{i.tags}</td>
                  <td>
                    {i.image ? (
                      <a target='_blank' rel='noreferrer' href={`${i.image}`}>
                        url
                      </a>
                    ) : (
                      'null'
                    )}
                  </td>
                  <td>{i.cast}</td>
                  <td>
                    <div className='flex'>
                      <button
                        className='btn btn-error'
                        onClick={() => handleDelete(i.id, 'movie')}
                      >
                        <svg
                          width='24'
                          height='24'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='1.5'
                            d='M17.25 6.75L6.75 17.25'
                          />
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='1.5'
                            d='M6.75 6.75L17.25 17.25'
                          />
                        </svg>
                      </button>
                      <button
                        className='btn btn-warning'
                        onClick={() => loadMovie(i)}
                      >
                        <svg
                          width='24'
                          height='24'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='1.5'
                            d='M4.75 19.25L9 18.25L18.2929 8.95711C18.6834 8.56658 18.6834 7.93342 18.2929 7.54289L16.4571 5.70711C16.0666 5.31658 15.4334 5.31658 15.0429 5.70711L5.75 15L4.75 19.25Z'
                          />
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='1.5'
                            d='M19.25 19.25H13.75'
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))
            .reverse()
        ) : (
          <tbody>
            <tr>
              <td>Movies not found</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default AddMovieList;
