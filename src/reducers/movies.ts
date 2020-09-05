import { Movie, Action, ActionTypes } from '../actions';

export const moviesReducer = (state: Movie[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_MOVIES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
