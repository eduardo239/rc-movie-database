import React, { useEffect, useState } from 'react';
import { deleteTv, getTvs } from '../store/tvs';
import { useDispatch, useSelector } from 'react-redux';
import { helperFunction } from '../helper';
import Loading from './Loading';
import Message from './Message';
import { Link } from 'react-router-dom';

const AddTvList = ({ loadMovie }) => {
  const dispatch = useDispatch();

  const [helperText, setHelperText] = useState({
    error: false,
    text: '',
    type: '',
  });

  const { data: tvs, loading } = useSelector((state) => state.tvs.tvs);

  const handleDelete = async (id, type) => {
    try {
      await dispatch(deleteTv(id));
      helperFunction(
        {
          error: false,
          text: 'Tv Show successfully deleted.',
          type: 'alert-success',
        },
        setHelperText
      );
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
      await dispatch(getTvs());
    }
  };

  useEffect(() => {
    (async function () {
      await dispatch(getTvs());
    })();
  }, [dispatch]);

  return (
    <div className='mt-4'>
      <h2>Tv List</h2>

      {!!helperText.text && (
        <Message data={helperText.text} type={helperText.type} />
      )}

      {loading && <Loading />}

      <table className='table-content'>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>year</th>
            <th>storyline</th>
            <th>tags</th>
            <th>cast</th>
            <th>image</th>
            <th>poster</th>
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
                  <td>{i.storyline ? i.storyline.slice(0, 50) + '...' : ''}</td>
                  <td>{i.tags}</td>
                  <td>{i.cast}</td>
                  <td>
                    {i.image ? (
                      <a target='_blank' rel='noreferrer' href={`${i.image}`}>
                        url
                      </a>
                    ) : (
                      'null'
                    )}
                  </td>
                  <td>
                    {i.poster ? (
                      <a target='_blank' rel='noreferrer' href={`${i.poster}`}>
                        url
                      </a>
                    ) : (
                      'null'
                    )}
                  </td>
                  <td>
                    <div className='flex'>
                      <a
                        href='#buttons'
                        className='btn-a btn-error'
                        onClick={() => handleDelete(i.id)}
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
                      </a>
                      <a
                        href='#content'
                        className='btn-a btn-warning'
                        onClick={() => loadMovie(i, 'tv')}
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
                      </a>
                      <Link to={`tv/${i.id}`} className='btn-a btn-info'>
                        <svg
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9V9ZM12 4.5C17 4.5 21.27 7.61 23 12C21.27 16.39 17 19.5 12 19.5C7 19.5 2.73 16.39 1 12C2.73 7.61 7 4.5 12 4.5ZM3.18 12C3.98825 13.6503 5.24331 15.0407 6.80248 16.0133C8.36165 16.9858 10.1624 17.5013 12 17.5013C13.8376 17.5013 15.6383 16.9858 17.1975 16.0133C18.7567 15.0407 20.0117 13.6503 20.82 12C20.0117 10.3497 18.7567 8.95925 17.1975 7.98675C15.6383 7.01424 13.8376 6.49868 12 6.49868C10.1624 6.49868 8.36165 7.01424 6.80248 7.98675C5.24331 8.95925 3.98825 10.3497 3.18 12V12Z'
                            fill='#1B1B1B'
                          />
                        </svg>
                      </Link>
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

export default AddTvList;
