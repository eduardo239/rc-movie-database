import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetSearch, searchMovie } from '../store/movies';
import { useSelector } from 'react-redux';
import Loading from './Loading';
import poster from '../assets/images/poster.jpg';
import { useHistory } from 'react-router-dom';

const Search = () => {
  const [term, setTerm] = useState('');
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.movies.search);
  const history = useHistory();
  // let path = history.location.pathname.replace(/\w/gi, '')
  let p = history.location.pathname;
  const handleClick = async (id) => {
    if (p === '/') {
      history.push(`movies/${id}`);
    } else if (p === '/movies' || p === '/tv' || p === '/add') {
      history.push(`movies/${id}`);
    } else {
      history.push(`${id}`);
    }
    setTerm('');
    await dispatch(resetSearch(''));
  };

  useEffect(() => {
    if (term.length >= 3) {
      (async function () {
        await dispatch(searchMovie(term));
      })();
    }
  }, [term, dispatch]);

  return (
    <div className='flex-1 App-search-container'>
      <input
        type='text'
        id='search'
        placeholder='search movies'
        onChange={(e) => setTerm(e.target.value)}
        value={term}
        autoFocus
        className='w-100'
      />

      <div
        style={{
          display: `${data && term ? 'block' : 'none'}`,
          position: 'absolute',
          width: '100%',
          zIndex: '1000',
        }}
      >
        {term.length >= 3 &&
          data &&
          data.length > 0 &&
          data.map((i) => (
            <button
              className='btn btn-secondary App-search'
              onClick={() => handleClick(i.id)}
              key={Math.random()}
            >
              <div className='flex gap-1'>
                <img className='App-poster-mini' src={poster} alt={i.name} />
                <div className='text-left'>
                  <h6>{i.name}</h6>
                  <p className='App-search--p'>
                    {(i.storyline && i.storyline.slice(0, 100) + '...') ||
                      'No storyline'}
                  </p>
                </div>
              </div>
            </button>
          ))}
      </div>
    </div>
  );
};

export default Search;
