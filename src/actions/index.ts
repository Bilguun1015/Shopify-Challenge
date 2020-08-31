import axios from 'axios';
import { Dispatch } from 'redux';

export const fetchMovies = (movieName: string) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get(
      `http://www.omdbapi.com/?s=${movieName}&apikey=${process.env.REACT_APP_API_KEY}`
    );

    dispatch({
      type: 'FETCH_MOVIES',
      payload: response.data,
    });
  };
};
