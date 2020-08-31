import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

interface Movie {
  imdbID: string;
  title: string;
  year: string;
}

export const fetchMovies = (movieName: string) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<Movie[]>(
      `http://www.omdbapi.com/?s=${movieName}&apikey=${process.env.REACT_APP_API_KEY}`
    );

    dispatch({
      type: ActionTypes.fetchMovies,
      payload: response.data,
    });
  };
};
