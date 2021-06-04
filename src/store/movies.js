import { createSlice } from '@reduxjs/toolkit';
import { supabase } from '../lib/api';
import { combineReducers } from '@reduxjs/toolkit';

export const getMoviesSlice = createSlice({
  name: 'movies',
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    reqGetMovies: (state) => {
      state.loading = true;
      state.error = null;
    },
    sucGetMovies: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    errGetMovies: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const getMovieSlice = createSlice({
  name: 'movie',
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    reqGetMovie: (state) => {
      state.loading = true;
      state.error = null;
    },
    sucGetMovie: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    errGetMovie: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const delMovieSlice = createSlice({
  name: 'movie',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    reqDelMovie: (state) => {
      state.loading = true;
      state.error = null;
    },
    sucDelMovie: (state) => {
      state.loading = false;
    },
    errDelMovie: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const searchMovieSlice = createSlice({
  name: 'search',
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    reqSearchMovie: (state) => {
      state.loading = true;
      state.error = null;
    },
    sucSearchMovie: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    errSearchMovie: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetSearchMovie: (state) => {
      state.loading = false;
      state.error = false;
      state.data = null;
    },
  },
});

export const pageViewIncSlice = createSlice({
  name: 'views',
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    reqPageView: (state) => {
      state.loading = true;
      state.error = null;
    },
    sucPageView: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    errPageView: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const reducer = combineReducers({
  movies: getMoviesSlice.reducer,
  movie: getMovieSlice.reducer,
  search: searchMovieSlice.reducer,
  views: pageViewIncSlice.reducer,
});

const { reqGetMovies, sucGetMovies, errGetMovies } = getMoviesSlice.actions;
const { reqGetMovie, sucGetMovie, errGetMovie } = getMovieSlice.actions;
const { reqDelMovie, sucDelMovie, errDelMovie } = delMovieSlice.actions;
const { reqSearchMovie, sucSearchMovie, errSearchMovie, resetSearchMovie } =
  searchMovieSlice.actions;
const { sucPageView, errPageView } = pageViewIncSlice.actions;

export default reducer;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const getMovies = () => async (dispatch) => {
  await dispatch(reqGetMovies());

  let { data, error } = await supabase.from('movies').select('*');

  if (error) errGetMovies(error);
  else await dispatch(sucGetMovies(data));
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const getMovie = (id) => async (dispatch) => {
  await dispatch(reqGetMovie());

  let { data, error } = await supabase.from('movies').select('*').eq('id', id);

  if (error) errGetMovie(error);
  else await dispatch(sucGetMovie(data[0]));
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const deleteMovie = (id) => async (dispatch) => {
  await dispatch(reqDelMovie());
  const { error } = await supabase.from('movies').delete().eq('id', id);
  if (error) errDelMovie(error);
  else dispatch(sucDelMovie());
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const searchMovie = (term, movieCheck) => async (dispatch) => {
  await dispatch(reqSearchMovie());

  let { data, error } = await supabase
    .from('tv')
    .select('*')
    .ilike('name', `%${term}%`);

  if (error) errSearchMovie(error);
  else await dispatch(sucSearchMovie(data));
};

export const resetSearch = () => async (dispatch) => {
  await dispatch(resetSearchMovie());
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const pageViewInc = (id) => async (dispatch) => {
  let { data, error } = await supabase
    .from('movies')
    .select('*')
    .eq('id', id)
    .single();

  if (data) {
    await supabase
      .from('movies')
      .update({ views: data.views + 1 })
      .eq('id', id);
  }

  if (error) errPageView(error);
  else await dispatch(sucPageView(data));
};
