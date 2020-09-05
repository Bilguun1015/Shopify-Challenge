import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes, Action } from './types';

declare module 'axios' {
  export interface AxiosRequestConfig {
    requireHeader: string[];
  }
}

export const fetchMovies = (movieName: string) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get(
      `https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?s=${movieName}&type=movie&apikey=${process.env.REACT_APP_API_KEY}`,
      { requireHeader: ['origin', 'x-requested-with'] }
    );
    if (response.data.Response === 'True') {
      dispatch<Action>({
        type: ActionTypes.FETCH_MOVIES_SUCCESS,
        payload: response.data.Search,
      });
    } else {
      dispatch<Action>({
        type: ActionTypes.FETCH_MOVIES_FAILURE,
        payload: { error: true, message: response.data.Error },
      });
    }
  };
};

export const resetError = (): Action => {
  return {
    type: ActionTypes.RESET_ERROR,
    payload: { error: false, message: '' },
  };
};
