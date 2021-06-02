import { createSlice } from '@reduxjs/toolkit';
import { supabase } from '../lib/api';
import { combineReducers } from '@reduxjs/toolkit';

export const getTvsSlice = createSlice({
  name: 'tvs',
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    reqGetTvs: (state) => {
      state.loading = true;
      state.error = null;
    },
    sucGetTvs: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    errGetTvs: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const getTvSlice = createSlice({
  name: 'tv',
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    reqGetTv: (state) => {
      state.loading = true;
      state.error = null;
    },
    sucGetTv: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    errGetTv: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const reducer = combineReducers({
  tvs: getTvsSlice.reducer,
  tv: getTvSlice.reducer,
});

export const delTvSlice = createSlice({
  name: 'movie',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    reqDelTv: (state) => {
      state.loading = true;
      state.error = null;
    },
    sucDelTv: (state) => {
      state.loading = false;
    },
    errDelTv: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { reqGetTvs, sucGetTvs, errGetTvs } = getTvsSlice.actions;
const { reqGetTv, sucGetTv, errGetTv } = getTvSlice.actions;
const { reqDelTv, sucDelTv, errDelTv } = delTvSlice.actions;

export default reducer;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const getTvs = () => async (dispatch) => {
  await dispatch(reqGetTvs());

  let { data, error } = await supabase.from('tv').select('*');

  if (error) errGetTvs(error);
  else await dispatch(sucGetTvs(data));
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const getTv = (id) => async (dispatch) => {
  await dispatch(reqGetTv());

  let { data, error } = await supabase.from('tv').select('*').eq('id', id);

  if (error) errGetTv(error);
  else await dispatch(sucGetTv(data[0]));
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const deleteTv = (id) => async (dispatch) => {
  await dispatch(reqDelTv());
  const { error } = await supabase.from('tv').delete().eq('id', id);
  if (error) errDelTv(error);
  else dispatch(sucDelTv());
};
