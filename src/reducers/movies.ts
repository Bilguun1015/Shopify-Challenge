import { Movie, FetchMoviesAction } from '../actions';
import { ActionTypes } from '../actions/types';

export const moviesReducer = (
  state: Movie[] = [],
  action: FetchMoviesAction
) => {
  switch (action.type) {
    case ActionTypes.fetchMovies:
      return action.payload;
    default:
      return state;
  }
};
