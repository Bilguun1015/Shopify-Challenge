import { Movie, Error, Action, ActionTypes } from '../actions';

export const moviesReducer = (state: Movie[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_MOVIES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const errorInitialState: Error = {
  error: false,
  message: '',
};

export const errorReducer = (state = errorInitialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_MOVIES_FAILURE:
      return action.payload;
    case ActionTypes.RESET_ERROR:
      return action.payload;
    default:
      return state;
  }
};

export const nominationReducer = (state: Movie[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_NOMINATIONS:
      return action.payload;
    case ActionTypes.NOMINATE_MOVIE:
      return action.payload;
    default:
      return state;
  }
};
