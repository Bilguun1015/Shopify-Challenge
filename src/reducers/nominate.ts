import { Movie, Action, ActionTypes } from '../actions';

export const nominationReducer = (state: Movie[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_NOMINATIONS:
      return action.payload;
    case ActionTypes.NOMINATE_MOVIE:
      return action.payload;
    case ActionTypes.DELETE_NOMINATION:
      return state.filter((movie: Movie) => movie.imdbID !== action.payload);
    default:
      return state;
  }
};
