import { createSlice } from '@reduxjs/toolkit';
// import { supabase } from '../lib/api';
import { combineReducers } from '@reduxjs/toolkit';

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

const reducer = combineReducers({
  login: loginSlice.reducer,
});

const { sucLoginUser } = loginSlice.actions;

export default reducer;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const userLogin = (user) => async (dispatch) => {
  await dispatch(sucLoginUser(user));
};
