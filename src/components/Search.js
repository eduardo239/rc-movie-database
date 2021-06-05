import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { resetSearch, searchMovie } from '../store/movies';
import { useSelector } from 'react-redux';
// eslint-disable-next-line
import Loading from './Loading';
import poster from '../assets/images/poster.jpg';
import { useHistory } from 'react-router-dom';
import { ReactComponent as TvIcon } from '../assets/icons2/mdi_television-classic.svg';
import { ReactComponent as MovieIcon } from '../assets/icons2/mdi_movie-open-outline.svg';
const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [term, setTerm] = useState('');

  // eslint-disable-next-line
  const { data, loading } = useSelector((state) => state.movies.search);

  // let path = history.location.pathname.replace(/\w/gi, '')

  const handleClick = async (id) => {
    let p = history.location.pathname;

    if (p === '/') {
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
        // const movie_check = movieRef.current.checked;
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
        className='App-search-result'
        style={{
          display: `${data && term ? 'block' : 'none'}`,
        }}
      >
        {term.length >= 3 &&
          data &&
          data.length > 0 &&
          data.map((i) => (
            <button
              className='App-search-button'
              onClick={() => handleClick(i.id)}
              key={Math.random()}
            >
              <div className='flex flex-align-center p-1 gap-1 text-left'>
                <img
                  className='App-poster-mini'
                  src={i.poster || poster}
                  alt={i.name}
                />
                <div className='App-search-result--body'>
                  <h5 className='mb-1'>{i.name}</h5>
                  <p>
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
