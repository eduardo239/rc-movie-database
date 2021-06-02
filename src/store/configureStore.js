import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';

import user from './user';
import movies from './movies';
import tvs from './tvs';

const middleware = [...getDefaultMiddleware()];
const reducer = combineReducers({ user, movies, tvs });
const store = configureStore({ reducer, middleware });

export default store;
