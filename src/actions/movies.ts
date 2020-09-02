import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes, Action } from './types';

export const fetchMovies = (movieName: string) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get(
      `http://www.omdbapi.com/?s=${movieName}&type=movie&apikey=${process.env.REACT_APP_API_KEY}`
    );
    console.log(response.data);
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
