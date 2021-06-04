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
  name: 'watchlist',
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
export const loadWatchlist = (user_id, item_id) => async (dispatch) => {
  await dispatch(reqWatchlist());
  let { data: watchlist, error } = await supabase
    .from('watchlist')
    .select('*')
    .eq('user_id', user_id);
  if (error) dispatch(errWatchlist(error));
  else dispatch(sucWatchlist(watchlist));
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const addToWatchlist =
  (user_id, item_id, watchlist_id) => async (dispatch) => {
    await dispatch(reqAddWatchlist());

    let { data: watchlist } = await supabase
      .from('watchlist')
      .select('*')
      .eq('id', watchlist_id)
      .single();

    const array_items = watchlist.items || [];
    console.log(array_items);

    // add new to list
    await supabase
      .from('watchlist')
      .upsert({ id: watchlist_id, items: { item_id: `"${item_id}"` } });

    console.log(watchlist);
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
