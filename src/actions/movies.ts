import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

// extra interface to check if we are dispatching the right action

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
}
export interface FetchMoviesAction {
  type: ActionTypes.FETCH_MOVIES_SUCCESS;
  payload: Movie[];
}

export interface FetchMoviesFailure {
  type: ActionTypes.FETCH_MOVIES_FAILURE;
  payload: string;
}

export const fetchMovies = (movieName: string) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get(
      `http://www.omdbapi.com/?s=${movieName}&type=movie&apikey=${process.env.REACT_APP_API_KEY}`
    );
    if (response.data.Response === 'True') {
      dispatch<FetchMoviesAction>({
        type: ActionTypes.FETCH_MOVIES_SUCCESS,
        payload: response.data.Search,
      });
    } else {
      dispatch<FetchMoviesFailure>({
        type: ActionTypes.FETCH_MOVIES_FAILURE,
        payload: response.data.Response,
      });
    }
  };
};
