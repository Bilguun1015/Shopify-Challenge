import { combineReducers } from 'redux';
import { moviesReducer } from './movies';
import { Movie } from '../actions';

export interface StoreState {
  movies: Movie[];
}
export const reducers = combineReducers<StoreState>({
  movies: moviesReducer,
});
