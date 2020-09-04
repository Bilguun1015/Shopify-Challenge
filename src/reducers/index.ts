import { combineReducers } from 'redux';
import { moviesReducer, errorReducer, nominationReducer } from './movies';
import { Movie, Error } from '../actions';

export interface StoreState {
  movies: Movie[];
  error: Error;
  nominations: Movie[];
}
export const reducers = combineReducers<StoreState>({
  movies: moviesReducer,
  error: errorReducer,
  nominations: nominationReducer,
});
