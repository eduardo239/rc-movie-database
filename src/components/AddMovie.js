import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { supabase } from '../lib/api';
import { ReactComponent as MovieIcon } from '../assets/icons2/mdi_movie-open-outline.svg';
import { ReactComponent as TvIcon } from '../assets/icons2/mdi_television-classic.svg';
import { ReactComponent as YtIcon } from '../assets/icons2/mdi_youtube.svg';
import { getMovies } from '../store/movies';
import { getApiMaze, getApiOMDB } from '../helper/api';
import {
  helperFunction,
  arrayToString,
  stringToArray,
  compactString,
  removeHtmlTags,
} from '../helper';
import Input from './Input';
import TextArea from './TextArea';
import InputButton from './InputButton';
import AddMovieList from './AddMovieList';
import Loading from './Loading';
import Message from './Message';

const AddMovie = () => {
  const dispatch = useDispatch();

  const [helperText, setHelperText] = useState({
    error: false,
    text: '',
    type: '',
  });

  const [movieCheck, setMovieCheck] = useState(true);
  const [tvCheck, setTvCheck] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);

  // eslint-disable-next-line
  const [file, setFile] = useState('');

  const [apiMaze, setApiMaze] = useState(null);
  const [apiOMDB, setApiOMDB] = useState(null);

  const nameRef0 = useRef();
  const nameRef1 = useRef();

  const IdRef = useRef();
  const nameRef = useRef();
  const yearRef = useRef();
  const directorRef = useRef();
  const posterRef = useRef();
  const imageRef = useRef();
  const ratingRef = useRef();
  const trailerRef = useRef();
  const castRef = useRef();
  const tagsRef = useRef();
  const storylineRef = useRef();

  const movieCheckRef = useRef();
  const tvCheckRef = useRef();

  const movieListRef = useRef();
  const tvListRef = useRef();

  // - - - - - - - - - post new content - - - - - - - -
  const handleAddMovie = async () => {
    const movieChecked = movieCheckRef.current.checked;
    const tvChecked = tvCheckRef.current.checked;

    const body = {
      name: nameRef.current.value.trim(),
      year: yearRef.current.value.trim(),
      director: directorRef.current.value.trim(),
      poster: posterRef.current.value.trim(),
      image: imageRef.current.value.trim(),
      rating: ratingRef.current.value || 0.0,
      trailer: trailerRef.current.value.trim(),
      tags: stringToArray(tagsRef.current.value),
      cast: stringToArray(castRef.current.value),
      storyline: storylineRef.current.value.trim(),
      type: movieChecked ? 'movie' : 'tv',
    };

    if (!movieChecked && !tvChecked) {
      helperFunction(
        true,
        'Please select movie or tv.',
        'alert-warning',
        setHelperText,
        5000
      );
    }

    if (body.name === '' || body.year === '') {
      helperFunction(
        true,
        'Please enter a number and/or year.',
        'alert-warning',
        setHelperText,
        3000
      );
      return;
    }

    const { error } = await supabase.from('movies').insert([body]);
    if (error) {
      helperFunction(true, error.message, 'alert-error', setHelperText, 3000);
    } else {
      helperFunction(
        false,
        'Movie successfully added.',
        'alert-success',
        setHelperText,
        3000
      );
    }
    await dispatch(getMovies());
  };

  // - - - - - - - - - load movie from table - - - - - - - -
  const loadMovie = (body, type) => {
    IdRef.current.value = body.id;
    nameRef.current.value = body.name;
    yearRef.current.value = body.year;
    directorRef.current.value = body.director;
    posterRef.current.value = body.poster;
    imageRef.current.value = body.image;
    ratingRef.current.value = body.rating || 0.0;
    trailerRef.current.value = body.trailer;
    tagsRef.current.value = arrayToString(body.tags);
    castRef.current.value = arrayToString(body.cast);
    storylineRef.current.value = removeHtmlTags(body.storyline);
    setMovieCheck(body.type === 'movie' ? true : false);
    setTvCheck(body.type === 'tv' ? true : false);
  };

  // - - - - - - - - - update content - - - - - - - -
  const handlerUpdateMovie = async () => {
    let id = IdRef.current.value;
    let name = nameRef.current.value;
    let year = yearRef.current.value;
    let director = directorRef.current.value;
    let poster = posterRef.current.value;
    let image = imageRef.current.value;
    let rating = ratingRef.current.value || 0.0;
    let trailer = trailerRef.current.value;
    let tags = stringToArray(tagsRef.current.value);
    let cast = stringToArray(castRef.current.value);
    let storyline = storylineRef.current.value;
    let updated_at = new Date();
    let type = movieCheckRef.current.checked ? 'movie' : 'tv';

    const body = {
      id,
      name,
      year,
      director,
      poster,
      image,
      rating,
      trailer,
      tags,
      cast,
      storyline,
      updated_at,
      type,
    };

    const { error } = await supabase.from('movies').update(body).eq('id', id);
    if (error) {
      helperFunction(true, error.message, 'alert-error', setHelperText, 9000);
    } else {
      helperFunction(
        false,
        'Movie successfully updated.',
        'alert-success',
        setHelperText,
        3000
      );
      await dispatch(getMovies());
    }
  };

  // - - - - - - - - - reset inputs - - - - - - - -
  const handleClear = () => {
    IdRef.current.value = '';
    nameRef.current.value = '';
    yearRef.current.value = '';
    directorRef.current.value = '';
    posterRef.current.value = '';
    imageRef.current.value = '';
    ratingRef.current.value = '';
    trailerRef.current.value = '';
    tagsRef.current.value = '';
    castRef.current.value = '';
    castRef.current.value = '';
    storylineRef.current.value = '';
  };

  // - - - - - - - - - toggle between radio input - - - - - - - -
  const handleRadioChange = () => {
    setMovieCheck(!movieCheck);
    setTvCheck(!tvCheck);
  };

  // - - - - - - - - - get content from api - - - - - - - -
  const searchTvMaze = async () => {
    resetApiSearch();
    setApiLoading(true);
    const term = nameRef0.current.value;
    const { data, error } = await getApiMaze(term);
    if (error)
      helperFunction(true, error.message, 'alert-error', setHelperText, 5000);
    setApiMaze(data);
    setApiLoading(false);
  };

  // - - - - - - - - - get content from api - - - - - - - -
  const searchOMDB = async () => {
    resetApiSearch();
    setApiLoading(true);
    const term = nameRef1.current.value;
    const { response, error } = await getApiOMDB(
      term,
      helperFunction,
      setHelperText
    );
    if (error) {
      console.log(error);
      helperFunction(true, error, 'alert-error', setHelperText, 5000);
      setApiLoading(false);
      return;
    }
    setApiOMDB(response);
    setApiLoading(false);
  };

  // - - - - - - - - - load in the fields - - - - - - - -
  const loadMovieFromApiOMDB = (x) => {
    handleClear();
    console.log(x);
    nameRef.current.value = x.Title || 'undefined';
    yearRef.current.value = x.Year ? x.Year.split('-')[0] : 'undefined';
    directorRef.current.value = x.Director || 'undefined';
    posterRef.current.value = x.Poster ? x.Poster : 'undefined';
    ratingRef.current.value = x.imdbRating || 0.0;
    tagsRef.current.value = x.Genre || 'undefined';
    castRef.current.value = x.Actors || 'undefined';
    storylineRef.current.value = x.Plot || 'undefined';
  };

  // - - - - - - - - - load in the fields - - - - - - - -
  const loadMovieFromApiMaze = (x) => {
    handleClear();
    // IdRef.current.value = '';
    console.log(x);
    nameRef.current.value = x.show.name;
    yearRef.current.value = x.show.premiered
      ? x.show.premiered.split('-')[0]
      : 'undefined';
    directorRef.current.value = '';
    posterRef.current.value = x.show.image ? x.show.image.medium : 'undefined';
    imageRef.current.value = '';
    ratingRef.current.value = x.show.rating.average || 0.0;
    trailerRef.current.value = '';
    tagsRef.current.value = arrayToString(x.show.genres) || 'undefined';
    castRef.current.value = '';
    storylineRef.current.value = removeHtmlTags(x.show.summary) || 'undefined';
  };

  const resetApiSearch = () => {
    setApiMaze(null);
    setApiOMDB(null);
  };

  // http://www.omdbapi.com/?i=tt3896198&apikey=f655bbbf
  // http://www.omdbapi.com/?t=game+of+thrones&apikey=f655bbbf

  // https://api.themoviedb.org/3/movie/550?api_key=11c410a46a513551618853674c632213
  // https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher

  return (
    <div>
      <div className='row g-3'>
        <h2 className='px-4'>Add Content</h2>

        {/* tb api maze */}
        {apiMaze && <h3 className='before'>Maze</h3>}
        {apiMaze &&
          apiMaze
            .map((item) => (
              <div className='App-maze-list' key={item.show.id}>
                <div>
                  <img
                    className='poster'
                    src={item.show.image ? item.show.image.medium : 'undefined'}
                    alt='poster'
                  />
                </div>
                <div>
                  <p>{item.show.name}</p>
                  <a
                    target='_blank'
                    href={`https://www.google.com/search?client=firefox-b-d&q=${item.show.name}+trailer`}
                    rel='noreferrer'
                  >
                    <YtIcon />
                  </a>
                  <p>{compactString(item.show.summary, 70)}</p>
                  <p>{arrayToString(item.show.genres)}</p>
                  <p>{item.show.premiered}</p>

                  <button
                    className='btn-icon btn-primary'
                    onClick={() => loadMovieFromApiMaze(item)}
                  >
                    Select
                  </button>
                </div>
              </div>
            ))
            .slice(0, 4)}

        {/* tv omdb */}
        {apiOMDB && <h3 className='before'>OMDB</h3>}
        <div className='flex flex-wrap'>
          {apiOMDB &&
            apiOMDB.map((item, index) => (
              <div className='App-omdb-list' key={index}>
                <div>
                  <img src={item.Poster} alt='' />
                </div>
                <div>
                  <h4>{item.Title}</h4>
                  <small>rating: {item.imdbRating}</small> -{' '}
                  <small>year: {item.Released}</small>
                  <p>{item.Plot}</p>
                  <p>{item.Genre}</p>
                  <p>{item.Actors}</p>
                  <button
                    className='btn-inline btn-primary'
                    onClick={() => loadMovieFromApiOMDB(item)}
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
        </div>

        {apiLoading && <Loading />}
      </div>
      <span id='content'></span>
      <div className='row g-3'>
        <div className='mb-3 col-md-4'>
          <InputButton
            label='name'
            type='text'
            id='movie-name'
            refs={nameRef0}
            fn={searchTvMaze}
            button='Maze'
          />
        </div>

        <div className='mb-3 col-md-4'>
          <InputButton
            label='name'
            type='text'
            id='movie-omdb'
            refs={nameRef1}
            fn={searchOMDB}
            button='OMDB'
          />
        </div>
      </div>
      {/* api search input */}
      <div className='row g-3'>
        <div className='mb-3 col-md-4'>
          <Input label='name' type='text' id='movie-name' refs={nameRef} />
        </div>

        <div className='mb-3 col-md-4'>
          <Input label='year' type='text' id='movie-year' refs={yearRef} />
        </div>

        <div className='mb-3 col-md-4'>
          <Input
            label='rating'
            type='text'
            id='movie-rating'
            refs={ratingRef}
          />
        </div>
      </div>

      <div className='row g-3'>
        <div className='mb-3 col-md-4'>
          <Input
            label='director'
            type='text'
            id='movie-director'
            refs={directorRef}
          />
        </div>

        <div className='mb-3 col-md-4'>
          <Input
            label='poster'
            type='text'
            id='movie-poster'
            refs={posterRef}
          />
        </div>

        <div className='mb-3 col-md-4'>
          <Input
            label='image-url'
            type='text'
            id='movie-image-url'
            refs={imageRef}
            onChange={(e) => setFile(e.target.value)}
          />
        </div>
      </div>

      <div className='row g-3'>
        <div className='mb-3 col-md-4'>
          <Input
            label='trailer URL'
            type='text'
            id='movie-trailer'
            refs={trailerRef}
          />
        </div>

        <div className='mb-3 col-md-4'>
          <Input label='cast' type='text' id='movie-cast' refs={castRef} />
        </div>

        <div className='mb-3 col-md-4'>
          <Input label='tags' type='text' id='movie-tags' refs={tagsRef} />
        </div>
      </div>

      <div className='row-g-3'>
        <div className='mb-3 col-12'>
          <div className='form-group'>
            <TextArea
              label='storyline'
              type='file'
              id='movie-storyline'
              refs={storylineRef}
            />
          </div>
        </div>
      </div>

      {/*  */}
      <div className='row g-3'>
        <div className='mb-3 col-md-6'>
          <div className='form-group'>
            <Input label='ID' type='text' id='movie-id' refs={IdRef} disabled />
          </div>
        </div>

        {/* 
          <p>
    <input type="radio" id="test1" name="radio-group" checked>
    <label for="test1">Apple</label>
  </p>
  <p>
    <input type="radio" id="test2" name="radio-group">
    <label for="test2">Peach</label>
  </p>
  <p>
    <input type="radio" id="test3" name="radio-group">
    <label for="test3">Orange</label>
  </p>
   */}

        <div className='mb-3 col-md-6 flex flex-align-end'>
          <div className='form-check'>
            <input
              type='radio'
              name='radio-group'
              id='radio-movie'
              checked={movieCheck}
              ref={movieCheckRef}
              onChange={handleRadioChange}
            />
            <label htmlFor='radio-movie'>Movie</label>
          </div>

          <div className='form-check'>
            <input
              type='radio'
              name='radio-group'
              id='radio-tv'
              checked={tvCheck}
              ref={tvCheckRef}
              onChange={handleRadioChange}
            />
            <label htmlFor='radio-tv'>TV</label>
          </div>
        </div>
      </div>
      {!!helperText.text && (
        <Message data={helperText.text} type={helperText.type} />
      )}

      <div className='mb-3 col-12'>
        <div className='flex mt-2 flex-wrap' id='buttons'>
          <button
            className='btn-inline btn-success me-2 mb-2'
            onClick={handleAddMovie}
          >
            Add New Content
          </button>

          <button
            className='btn-inline btn-info me-2 mb-2'
            onClick={handlerUpdateMovie}
          >
            Update Content
          </button>

          <button className='btn-inline me-2 mb-2' onClick={handleClear}>
            Clear Fields
          </button>

          <button className='btn-inline me-2 mb-2' onClick={resetApiSearch}>
            Clear Search
          </button>
        </div>
      </div>

      {/* tab */}
      <section className='mt-5'>
        <div className='flex flex-align-center'>
          <button className={`btn-inline me-2 btn-secondary`}>
            <MovieIcon /> movie
          </button>
          <button className={`btn-inline  btn-primary`}>
            <TvIcon /> tv
          </button>
        </div>
        <div ref={movieListRef}>
          <AddMovieList loadMovie={loadMovie} />
        </div>
        <div ref={tvListRef} style={{ display: 'none' }}>
          2
        </div>
      </section>
    </div>
  );
};

export default AddMovie;
