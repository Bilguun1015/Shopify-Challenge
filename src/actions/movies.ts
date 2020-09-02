import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export interface Error {
  error: boolean;
  message: string;
}

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
  payload: Error;
}

export const fetchMovies = (movieName: string) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get(
      `http://www.omdbapi.com/?s=${movieName}&type=movie&apikey=${process.env.REACT_APP_API_KEY}`
    );
    console.log(response.data);
    if (response.data.Response === 'True') {
      dispatch<FetchMoviesAction>({
        type: ActionTypes.FETCH_MOVIES_SUCCESS,
        payload: response.data.Search,
      });
    } else {
      dispatch<FetchMoviesFailure>({
        type: ActionTypes.FETCH_MOVIES_FAILURE,
        payload: { error: true, message: response.data.Error },
      });
    }
  };
};
