import { Movie, Error, Action, ActionTypes } from '../actions';

export const moviesReducer = (state: Movie[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_MOVIES_SUCCESS:
      return action.payload;
    case ActionTypes.DELETE_MOVIE:
      return state.filter((movie: Movie) => movie.imdbID !== action.payload);
    default:
      return state;
  }
};

const initialState: Error = {
  error: false,
  message: '',
};

export const errorReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_MOVIES_FAILURE:
      return action.payload;
    case ActionTypes.RESET_ERROR:
      return action.payload;
    default:
      return state;
  }
};
