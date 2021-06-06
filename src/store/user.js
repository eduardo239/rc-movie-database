import { createSlice } from '@reduxjs/toolkit';
// import { supabase } from '../lib/api';
import { combineReducers } from '@reduxjs/toolkit';
import { supabase } from '../lib/api';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    sucLoginUser: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
  },
});

export const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    reqWatchlist: (state) => {
      state.loading = true;
      state.error = null;
    },
    sucWatchlist: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    errWatchlist: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const addWatchlistSlice = createSlice({
  name: 'watchlist-add',
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    reqAddWatchlist: (state) => {
      state.loading = true;
      state.error = null;
    },
    sucAddWatchlist: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    errAddWatchlist: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const reducer = combineReducers({
  login: loginSlice.reducer,
  watchlist: watchlistSlice.reducer,
});

const { sucLoginUser } = loginSlice.actions;
const { reqWatchlist, sucWatchlist, errWatchlist } = watchlistSlice.actions;
// eslint-disable-next-line
const { reqAddWatchlist, sucAddWatchlist, errAddWatchlist } =
  addWatchlistSlice.actions;

export default reducer;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const userLogin = (user) => async (dispatch) => {
  await dispatch(sucLoginUser(user));
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const getWatchlist = (user_id) => async (dispatch) => {
  await dispatch(reqWatchlist());

  let { data, error } = await supabase
    .from('profile')
    .select(`watchlist(*)`)
    .eq('user_id', user_id)
    .single();

  if (error) dispatch(errWatchlist(error));
  else dispatch(sucWatchlist(data));
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 *
 * @param {String} item_id
 * @param {String} watchlist_id
 * @returns
 */
export const addToWatchlist = (item_id, watchlist_id) => async (dispatch) => {
  await dispatch(reqAddWatchlist());

  //create item
  const { data: itemData, error: errorData } = await supabase
    .from('items')
    .insert([{ i_will_see: true }]);
  if (errorData) dispatch(errWatchlist(errorData));

  // select watchlist
  let { data: watchlist, error: watchlistError } = await supabase
    .from('watchlist')
    .select('*')
    .eq('id', watchlist_id);
  if (watchlistError) dispatch(errWatchlist(watchlistError));

  let array_items = watchlist[0].items;
  if (!array_items) array_items = [];
  if (array_items.includes(itemData[0].id)) {
    return { message: 'The item is already on your watchlist.' };
  }
  array_items.push(itemData[0].id);

  const { data: push, error: errorPush } = await supabase
    .from('watchlist')
    .update([{ items: array_items }], { upsert: true })
    .eq('id', watchlist_id);

  if (errorPush) dispatch(errWatchlist(errorPush));
  else dispatch(sucAddWatchlist(push));
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
