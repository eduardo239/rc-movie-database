import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { supabase } from '../lib/api';
import { getMovies } from '../store/movies';
import { getTvs } from '../store/tvs';
import AddMovieList from './AddMovieList';
import Message from './Message';

import { helperFunction, arrayToString, stringToArray } from '../helper';

const AddMovie = () => {
  const dispatch = useDispatch();

  const [helperText, setHelperText] = useState({
    error: false,
    text: '',
    type: '',
  });

  const [file, setFile] = useState('');

  const IdRef = useRef();
  const movieNameRef = useRef();
  const movieYearRef = useRef();
  const movieDirectorRef = useRef();
  const moviePosterRef = useRef();
  const movieImageRef = useRef();
  const movieRatingRef = useRef();
  const movieTrailerRef = useRef();
  const movieCastRef = useRef();
  const movieTagsRef = useRef();
  const movieStorylineRef = useRef();

  const movieRadioRef = useRef();
  const tvRadioRef = useRef();

  const handlerAddMovie = async () => {
    const movieRadio = movieRadioRef.current.checked;
    const tvRadio = tvRadioRef.current.checked;

    const body = {
      name: movieNameRef.current.value,
      year: movieYearRef.current.value,
      director: movieDirectorRef.current.value,
      poster: moviePosterRef.current.value,
      image: file,
      rating: movieRatingRef.current.value || 0.0,
      trailer: movieTrailerRef.current.value,
      tags: stringToArray(movieTagsRef.current.value),
      cast: stringToArray(movieCastRef.current.value),
      storyline: movieStorylineRef.current.value,
    };

    console.log(body);

    const formData = new FormData();
    formData.append('image', file);

    (async function () {
      const response = await fetch('https://api.imgur.com/3/image/', {
        method: 'post',
        headers: {
          Authorization: 'Client-ID 7fd98e30ccbeb65',
        },
        body: formData,
      });
      console.log(response);
    })();

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
      const { data, error } = await supabase.from('movies').insert([body]);
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
      const { data, error } = await supabase.from('tv').insert([body]);
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

  const loadMovie = (body) => {
    IdRef.current.value = body.id;
    movieNameRef.current.value = body.name;
    movieYearRef.current.value = body.year;
    movieDirectorRef.current.value = body.director;
    moviePosterRef.current.value = body.poster;
    movieImageRef.current.value = body.image || '';
    movieRatingRef.current.value = body.rating || 0.0;
    movieTrailerRef.current.value = body.trailer;
    movieTagsRef.current.value = arrayToString(body.tags);
    movieCastRef.current.value = arrayToString(body.cast);
    movieStorylineRef.current.value = body.storyline;

    window.scrollTo(0, 150);
  };

  const handlerUpdateMovie = async () => {
    let id = IdRef.current.value;
    let name = movieNameRef.current.value;
    let year = movieYearRef.current.value;
    let director = movieDirectorRef.current.value;
    let poster = moviePosterRef.current.value;
    let image = movieImageRef.current.target.value;
    let rating = movieRatingRef.current.value || 0.0;
    let trailer = movieTrailerRef.current.value;
    let tags = stringToArray(movieTagsRef.current.value);
    let cast = stringToArray(movieCastRef.current.value);
    let storyline = movieStorylineRef.current.value;

    console.log(image);

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
      const { data, error } = await supabase
        .from('movies')
        .update(body)
        .eq('id', id);

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
            text: 'Movie successfully  updated.',
            type: 'alert-success',
          },
          setHelperText
        );

        await dispatch(getMovies());
      }
    }

    if (tvRadio) {
      const { data, error } = await supabase
        .from('tv')
        .update(body)
        .eq('id', id);

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
            text: 'Tv successfully  updated.',
            type: 'alert-success',
          },
          setHelperText
        );

        await dispatch(getTvs());
      }
    }
  };

  const handlerClear = () => {
    IdRef.current.value = '';
    movieNameRef.current.value = '';
    movieYearRef.current.value = '';
    movieDirectorRef.current.value = '';
    moviePosterRef.current.value = '';
    movieImageRef.current.value = '';
    movieRatingRef.current.value = '';
    movieTrailerRef.current.value = '';
    movieTagsRef.current.value = '';
    movieCastRef.current.value = '';
    movieCastRef.current.value = '';
    movieStorylineRef.current.value = '';
  };

  return (
    <div>
      <div className='row g-3'>
        <h2>Add Content</h2>

        <div className='mb-3 col-md-6'>
          <label htmlFor='movie-name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-control'
            id='movie-name'
            aria-describedby='movieName'
            ref={movieNameRef}
          />
        </div>

        <div className='mb-3 col-md-6'>
          <label htmlFor='movie-year' className='form-label'>
            Year
          </label>
          <input
            type='text'
            className='form-control'
            id='movie-year'
            aria-describedby='movieYear'
            ref={movieYearRef}
          />
        </div>
      </div>

      <div className='row g-3'>
        <div className='mb-3 col-md-4'>
          <label htmlFor='movie-director' className='form-label'>
            Director
          </label>
          <input
            type='text'
            className='form-control'
            id='movie-director'
            aria-describedby='movieDirector'
            ref={movieDirectorRef}
          />
        </div>

        <div className='mb-3 col-md-4'>
          <label htmlFor='movie-poster' className='form-label'>
            Poster URL
          </label>
          <input
            type='text'
            className='form-control'
            id='movie-poster'
            aria-describedby='moviePoster'
            ref={moviePosterRef}
          />
        </div>

        <div className='mb-3 col-md-4'>
          <label htmlFor='movie-poster' className='form-label'>
            Image
          </label>
          <input
            type='file'
            className='form-control'
            id='movie-image'
            aria-describedby='movieImage'
            ref={movieImageRef}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
      </div>

      <div className='row g-3'>
        <div className='mb-3 col-md-6'>
          <label htmlFor='movie-rating' className='form-label'>
            Rating
          </label>
          <input
            type='text'
            className='form-control'
            id='movie-rating'
            aria-describedby='movieRating'
            ref={movieRatingRef}
          />
        </div>

        <div className='mb-3 col-md-6'>
          <label htmlFor='movie-trailer' className='form-label'>
            Trailer
          </label>
          <input
            type='text'
            className='form-control'
            id='movie-trailer'
            aria-describedby='movieTrailer'
            ref={movieTrailerRef}
          />
        </div>
      </div>

      <div className='row g-3'>
        <div className='mb-3 col-md-6'>
          <label htmlFor='movie-cast' className='form-label'>
            Cast
          </label>
          <input
            type='text'
            className='form-control'
            id='movie-cast'
            aria-describedby='movieCast'
            ref={movieCastRef}
          />
        </div>

        <div className='mb-3 col-md-6'>
          <label htmlFor='movie-tags' className='form-label'>
            Tags
          </label>
          <input
            type='text'
            className='form-control'
            id='movie-tags'
            aria-describedby='tags'
            ref={movieTagsRef}
          />
        </div>
      </div>

      <div className='form-group'>
        <label htmlFor='exampleFormControlTextarea1'>Storyline</label>
        <textarea
          className='form-control'
          id='exampleFormControlTextarea1'
          rows='3'
          ref={movieStorylineRef}
        ></textarea>
      </div>

      <div className='form-group flex align-center'>
        <div className='field-radio'>
          <input
            className='form-check-input'
            type='radio'
            name='inlineRadioOptions'
            id='inlineRadio1'
            value='movie'
            ref={movieRadioRef}
          />
          <label className='form-check-label' htmlFor='inlineRadio1'>
            Movie
          </label>
        </div>
        <div className='field-radio'>
          <input
            className='form-check-input'
            type='radio'
            name='inlineRadioOptions'
            id='inlineRadio2'
            value='tv'
            ref={tvRadioRef}
          />
          <label className='form-check-label' htmlFor='inlineRadio2'>
            TV
          </label>
        </div>

        <div
          className='form-group'
          style={{
            display: 'inline-block',
            width: '30%',
            marginLeft: 'auto',
            marginTop: '0.5rem',
            float: 'right',
          }}
        >
          <label>ID</label>
          <input type='text' ref={IdRef} disabled />
        </div>
      </div>

      <div className='flex mt-3'>
        <button className='btn-inline btn-success' onClick={handlerAddMovie}>
          Add New Content
        </button>

        <button className='btn-inline btn-warning' onClick={handlerUpdateMovie}>
          Update Content
        </button>

        <button className='btn-inline btn-error' onClick={handlerClear}>
          Clear Fields
        </button>
      </div>
      {!!helperText.text && (
        <Message data={helperText.text} type={helperText.type} />
      )}

      {/* tab */}

      <AddMovieList loadMovie={loadMovie} />
    </div>
  );
};

export default AddMovie;
