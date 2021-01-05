import { Movie, Action, ActionTypes } from '../actions';

const movieInitialState: Movie[] = [];

export const moviesReducer = (state = movieInitialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_MOVIES_SUCCESS:
      return action.payload;
    case ActionTypes.FETCH_MOVIES_FAILURE:
      return movieInitialState;
    default:
      return state;
  }
};
