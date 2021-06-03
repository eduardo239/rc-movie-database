import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { supabase } from '../lib/api';
import { getMovies } from '../store/movies';
import { getTvs } from '../store/tvs';
import AddMovieList from './AddMovieList';
import Message from './Message';
import InputButton from './InputButton';

import {
  helperFunction,
  arrayToString,
  stringToArray,
  compactString,
} from '../helper';
import AddTvList from './AddTvList';
import Input from './Input';
import TextArea from './TextArea';
import Radio from './Radio';
import Loading from './Loading';

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
  const [tab1, setTab1] = useState(true);
  const [tab2, setTab2] = useState(false);

  const [apiMaze, setApiMaze] = useState(null);

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

  const movieRadioRef = useRef();
  const tvRadioRef = useRef();

  const movieListRef = useRef();
  const tvListRef = useRef();

  const handlerAddMovie = async () => {
    const movieRadio = movieRadioRef.current.checked;
    const tvRadio = tvRadioRef.current.checked;

    const body = {
      name: nameRef.current.value,
      year: yearRef.current.value,
      director: directorRef.current.value,
      poster: posterRef.current.value,
      image: imageRef.current.value,
      rating: ratingRef.current.value || 0.0,
      trailer: trailerRef.current.value,
      tags: stringToArray(tagsRef.current.value),
      cast: stringToArray(castRef.current.value),
      storyline: storylineRef.current.value,
    };

    // const formData = new FormData();
    // formData.append('image', file);

    // (async function () {
    //   const response = await fetch('https://api.imgur.com/3/image/', {
    //     method: 'post',
    //     headers: {
    //       Authorization: 'Client-ID 7fd98e30ccbeb65',
    //     },
    //     body: formData,
    //   });
    //   console.log(response);
    // })();

    if (body.name === '' || body.year === '') {
      helperFunction(
        {
          error: true,
          text: 'Please enter a name and/or year.',
          type: 'alert-warning',
        },
        setHelperText
      );
      return;
    }

    if (!movieRadio && !tvRadio) {
      helperFunction(
        {
          error: true,
          text: 'Please select Movie or Tv',
          type: 'alert-warning',
        },
        setHelperText
      );
      return;
    }

    if (movieRadio) {
      const { error } = await supabase.from('movies').insert([body]);
      if (error) {
        helperFunction(
          {
            error: true,
            text: error.message,
            type: 'alert-error',
          },
          setHelperText
        );
      } else {
        helperFunction(
          {
            error: false,
            text: 'Movie successfully added.',
            type: 'alert-success',
          },
          setHelperText
        );
      }
      await dispatch(getMovies());
    }

    if (tvRadio) {
      const { error } = await supabase.from('tv').insert([body]);
      if (error) {
        helperFunction(
          {
            error: true,
            text: error.message,
            type: 'alert-error',
          },
          setHelperText
        );
      } else {
        helperFunction(
          {
            error: false,
            text: 'Movie successfully added.',
            type: 'alert-success',
          },
          setHelperText
        );
      }
      await dispatch(getTvs());
    }
  };

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
    storylineRef.current.value = body.storyline;

    if (type === 'tv') {
      setTvCheck(true);
      setMovieCheck(false);
    } else if (type === 'movie') {
      setMovieCheck(true);
      setTvCheck(false);
    }
  };

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
    };

    const movieRadio = movieRadioRef.current.checked;
    const tvRadio = tvRadioRef.current.checked;

    if (!movieRadio && !tvRadio) {
      helperFunction(
        {
          error: true,
          text: 'Please select Movie or Tv',
          type: 'alert-info',
        },
        setHelperText
      );
    }

    if (movieRadio) {
      const { error } = await supabase.from('movies').update(body).eq('id', id);

      if (error) {
        helperFunction(
          {
            error: true,
            text: error.message,
            type: 'alert-error',
          },
          setHelperText
        );
      } else {
        helperFunction(
          {
            error: false,
            text: 'Movie successfully updated.',
            type: 'alert-success',
          },
          setHelperText
        );

        await dispatch(getMovies());
      }
    }

    if (tvRadio) {
      const { error } = await supabase.from('tv').update(body).eq('id', id);

      if (error) {
        helperFunction(
          {
            error: true,
            text: error.message,
            type: 'alert-error',
          },
          setHelperText
        );
      } else {
        helperFunction(
          {
            error: false,
            text: 'Tv successfully updated.',
            type: 'alert-success',
          },
          setHelperText
        );

        await dispatch(getTvs());
      }
    }
  };

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

  const tabMovie = () => {
    tvListRef.current.style.display = 'none';
    movieListRef.current.style.display = 'block';
    if (!tab1) setTab1(!tab1);
    if (tab2) setTab2(!tab2);
  };

  const tabTv = () => {
    tvListRef.current.style.display = 'block';
    movieListRef.current.style.display = 'none';
    if (tab1) setTab2(!tab2);
    if (!tab2) setTab1(!tab1);
  };

  const handleRadioChange = () => {
    setMovieCheck(!movieCheck);
    setTvCheck(!tvCheck);
  };

  const searchTvMaze = async () => {
    setApiLoading(true);
    const term = nameRef.current.value;

    try {
      const response = await fetch(
        `http://api.tvmaze.com/search/shows?q=${term}`
      );
      const json = await response.json();
      setApiMaze(json);
    } catch (error) {
      alert(error);
    }
    setApiLoading(false);
  };

  const loadMovieFromApi = (x) => {
    // IdRef.current.value = x.show.id;
    nameRef.current.value = x.show.name;
    yearRef.current.value = x.show.premiered
      ? x.show.premiered.split('-')[0]
      : 'undefined';
    // directorRef.current.value = x.show.director;
    posterRef.current.value = x.show.image ? x.show.image.medium : 'undefined';
    // imageRef.current.value = x.show.image.medium || x.show.image.original;
    ratingRef.current.value = x.show.rating.average || 0.0;
    // trailerRef.current.value = x.show.trailer;
    tagsRef.current.value = arrayToString(x.show.genres) || 'undefined';
    // castRef.current.value = arrayToString(x.show.cast);
    storylineRef.current.value = x.show.summary || 'undefined';
  };

  return (
    <div>
      <div className='row g-3'>
        <h2 id='content' className='px-4'>
          Add Content
        </h2>

        {apiMaze &&
          apiMaze.map((item) => (
            <div className='App-maze-list' key={item.show.id}>
              <p style={{ position: 'relative' }}>
                <img
                  className='poster-small'
                  src={item.show.image ? item.show.image.medium : 'undefined'}
                  alt='poster'
                />
              </p>
              <p>{item.show.name}</p>
              <p>{compactString(item.show.summary, 70)}</p>
              <p>{arrayToString(item.show.genres)}</p>
              <p>{item.show.premiered}</p>
              <div>
                <button
                  style={{ width: 'auto', height: 'auto' }}
                  className='btn-inline btn-primary'
                  onClick={() => loadMovieFromApi(item)}
                >
                  load
                </button>
              </div>
            </div>
          ))}

        {apiLoading ? (
          <Loading />
        ) : (
          <div className='mb-3 col-md-4 field-input-button'>
            <InputButton
              label='name'
              type='text'
              id='movie-name'
              refs={nameRef}
              searchTvMaze={searchTvMaze}
            />
          </div>
        )}

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

        {/* <div className='mb-3 col-md-4'>
          <Input
            label='image'
            type='file'
            id='movie-image'
            refs={imageRef}
            disabled
          />
        </div> */}
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

      <div className='form-group'>
        <TextArea
          label='storyline'
          type='file'
          id='movie-storyline'
          refs={storylineRef}
        />
      </div>

      <div className='form-group flex align-center'>
        <div className='field-radio'>
          <Radio
            type='radio'
            id='type-1'
            name='inlineRadioOptions'
            value='movie'
            refs={movieRadioRef}
            checked={movieCheck}
            onChange={handleRadioChange}
          />

          {/* <input
            className='form-check-input'
            type='radio'
            name='inlineRadioOptions'
            id='inlineRadio1'
            value='movie'
            ref={movieRadioRef}
          />
          <label className='form-check-label' htmlFor='inlineRadio1'>
            Movie
          </label> */}
        </div>
        <div className='field-radio'>
          <Radio
            type='radio'
            id='type-2'
            name='inlineRadioOptions'
            value='tv'
            refs={tvRadioRef}
            checked={tvCheck}
            onChange={handleRadioChange}
          />
        </div>

        <div
          className='form-group'
          style={{
            display: 'inline-block',
            minWidth: '350px',
            width: 'auto',
            marginLeft: 'auto',
            marginTop: '0.5rem',
            float: 'right',
          }}
        >
          <Input label='ID' type='text' id='movie-id' refs={IdRef} disabled />
        </div>
      </div>

      <div className='flex mt-3' id='buttons'>
        <button className='btn-inline btn-success' onClick={handlerAddMovie}>
          Add New Content
        </button>

        <button className='btn-inline btn-warning' onClick={handlerUpdateMovie}>
          Update Content
        </button>

        <button className='btn-inline btn-error' onClick={handleClear}>
          Clear Fields
        </button>
      </div>
      {!!helperText.text && (
        <Message data={helperText.text} type={helperText.type} />
      )}

      {/* tab */}
      <section>
        <h2>Select</h2>
        <div>
          <button
            className={`btn-inline ${tab1 ? 'btn-primary' : 'btn-secondary'}`}
            onClick={tabMovie}
          >
            movie
          </button>
          <button
            className={`btn-inline ${tab2 ? 'btn-primary' : 'btn-secondary'}`}
            onClick={tabTv}
          >
            tv
          </button>
        </div>
        <div ref={movieListRef}>
          <AddMovieList loadMovie={loadMovie} />
        </div>
        <div ref={tvListRef} style={{ display: 'none' }}>
          <AddTvList loadMovie={loadMovie} />
        </div>
      </section>
    </div>
  );
};

export default AddMovie;
