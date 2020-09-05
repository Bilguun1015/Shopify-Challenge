import { combineReducers } from 'redux';
import { moviesReducer } from './movies';
import { errorReducer } from './error';
import { nominationReducer } from './nominate';
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
