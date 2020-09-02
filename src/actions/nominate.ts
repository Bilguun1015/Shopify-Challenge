import { Dispatch } from 'redux';
import { Movie } from './types';

export const setNomination = ({}: Movie) => {
  return async (dispatch: Dispatch) => {};
};

export const getNominations = () => {
  return async (dispatch: Dispatch) => {
    let response = await localStorage.getItem('nominations');
    if (response) {
      response = JSON.parse(response);
    } else {
      console.log(response);
    }
    console.log(response);
  };
};

// export const getNomination = (key: string): boolean => {

// };
