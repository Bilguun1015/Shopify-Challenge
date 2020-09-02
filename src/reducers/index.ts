import { combineReducers } from 'redux';
import { moviesReducer, errorReducer } from './movies';
import { Movie, Error } from '../actions';

export interface StoreState {
  movies: Movie[];
  error: Error;
}
export const reducers = combineReducers<StoreState>({
  movies: moviesReducer,
  error: errorReducer,
});
