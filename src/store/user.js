import { createSlice } from '@reduxjs/toolkit';
import { supabase } from '../lib/api';
import { combineReducers } from '@reduxjs/toolkit';

export const addUserSlice = createSlice({
  name: 'add',
  initialState: {
    loading: false,
    course: null,
    error: null,
  },
  reducers: {
    reqAddUser: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    sucAddUser: (state, action) => {
      state.loading = false;
      state.course = action.payload;
    },
    errAddUser: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const putUserSlice = createSlice({
  name: 'update',
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    reqUpdateUser: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    sucUpdateUser: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    errUpdateUser: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const getUsersSlice = createSlice({
  name: 'users',
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    reqGetUsers: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    sucGetUsers: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    errGetUsers: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const delUserSlice = createSlice({
  name: 'delete',
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    reqDeleteUser: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    sucDeleteUser: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    errDeleteUser: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const reducer = combineReducers({
  add: addUserSlice.reducer,
  update: putUserSlice.reducer,
  users: getUsersSlice.reducer,
  delete: delUserSlice.reducer,
});

const { reqAddUser, sucAddUser, errAddUser } = addUserSlice.actions;
const { reqUpdateUser, sucUpdateUser, errUpdateUser } = putUserSlice.actions;
const { reqGetUsers, sucGetUsers, errGetUsers } = getUsersSlice.actions;
const { reqDeleteUser, sucDeleteUser, errDeleteUser } = delUserSlice.actions;

export default reducer;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const addCourse = (body) => async (dispatch) => {
  await dispatch(reqAddUser());

  const { data, error } = await supabase.from('courses').insert([body]);

  if (error) await errAddUser(error);
  else await dispatch(sucAddUser(data));
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const updateCourse = (body) => async (dispatch) => {
  await dispatch(reqUpdateUser());

  const { data, error } = await supabase
    .from('courses')
    .update(body)
    .eq('id', body.id);

  if (error) await errUpdateUser(error);
  else await dispatch(sucUpdateUser(data));
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const getCourses = () => async (dispatch) => {
  await dispatch(reqGetUsers());

  const { data, error } = await supabase.from('courses').select('*');

  if (error) await errGetUsers(error);
  else await dispatch(sucGetUsers(data));
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const deleteCourse = (id) => async (dispatch) => {
  await dispatch(reqDeleteUser());

  const { data, error } = await supabase.from('courses').delete().eq('id', id);

  if (error) await errDeleteUser(error);
  else await dispatch(sucDeleteUser(data));
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
