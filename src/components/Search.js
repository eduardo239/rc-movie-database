import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetSearch, searchMovie } from '../store/movies';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { routingTo, compactString } from '../helper';
import Loading from './Loading';
import poster from '../assets/images/poster.jpg';

const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [term, setTerm] = useState('');

  const { data, loading } = useSelector((state) => state.movies.search);

  const handleClick = async (id) => {
    // routingTo({ id, history, to: 'movies' });
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
        className='App-search-result'
        style={{
          display: `${data && term ? 'block' : 'none'}`,
        }}
      >
        {term.length >= 3 &&
          data &&
          data.length > 0 &&
          data.map((i) => (
            <Link
              className='link-search'
              to={`/movies/${i.id}`}
              onClick={handleClick}
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
                    {(i.storyline && compactString(i.storyline, 150)) ||
                      'No storyline'}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Search;
