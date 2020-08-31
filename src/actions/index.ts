import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export interface Movie {
  imdbID: string;
  title: string;
  year: string;
}
// extra interface to check if we are dispatching the right action
export interface FetchMoviesAction {
  type: ActionTypes.fetchMovies;
  payload: Movie[];
}

export const fetchMovies = (movieName: string) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<Movie[]>(
      `http://www.omdbapi.com/?s=${movieName}&apikey=${process.env.REACT_APP_API_KEY}`
    );

    dispatch<FetchMoviesAction>({
      type: ActionTypes.fetchMovies,
      payload: response.data,
    });
  };
};
