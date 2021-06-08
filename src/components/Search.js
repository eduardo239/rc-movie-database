import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetSearch, searchMovie } from '../store/movies';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { compactString } from '../helper';
import { ReactComponent as CloseIcon } from '../assets/icons2/mdi_close_w.svg';
import Loading from './Loading';
import poster from '../assets/images/poster.jpg';

const Search = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const [term, setTerm] = useState('');

  const { data, loading } = useSelector((state) => state.movies.search);

  const handleClick = async (id) => {
    setTerm('');
    await dispatch(resetSearch(''));
  };

  const handleReset = () => {
    setTerm('');
  };

  useEffect(() => {
    if (term.length >= 3) {
      (async function () {
        await dispatch(searchMovie(term));
      })();
    }
  }, [term, dispatch]);

  return (
    <div className='flex-1 App-search--container'>
      <input
        type='text'
        id='search'
        placeholder='search movies'
        onChange={(e) => setTerm(e.target.value)}
        value={term}
        autoFocus
        className='w-100'
      />
      {!!term.length && (
        <button
          className='App-search--button btn-icon btn-transparent'
          onClick={handleReset}
        >
          <CloseIcon />
        </button>
      )}

      <div
        className='App-search-result'
        style={{
          display: `${data && term ? 'block' : 'none'}`,
        }}
      >
        {loading ? (
          <div className='py-4'>
            <Loading />
          </div>
        ) : (
          term.length >= 3 &&
          data &&
          data.length > 0 &&
          data
            .map((i) => (
              <Link
                className='link-search'
                to={`/movies/${i.id}`}
                onClick={handleClick}
                key={i.id}
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
                      {(i.storyline && compactString(i.storyline, 125)) ||
                        'No storyline'}
                    </p>
                  </div>
                </div>
              </Link>
            ))
            .slice(0, 5)
        )}
      </div>
    </div>
  );
};

export default Search;
