import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';

import user from './user';
import movies from './movies';

const middleware = [...getDefaultMiddleware()];
const reducer = combineReducers({ user, movies });
const store = configureStore({ reducer, middleware });

export default store;
