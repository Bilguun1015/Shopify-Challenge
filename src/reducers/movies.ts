import { Movie, FetchMoviesAction } from '../actions';
import { ActionTypes } from '../actions/types';

export const moviesReducer = (
  state: Movie[] = [],
  action: FetchMoviesAction
) => {
  switch (action.type) {
    case ActionTypes.FETCH_MOVIES_SUCCESS:
      return action.payload;
    case ActionTypes.FETCH_MOVIES_FAILURE:
      return action.payload;
    default:
      return state;
  }
};
