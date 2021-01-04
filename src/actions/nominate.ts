import { Movie, ActionTypes, Action } from './types';

// fetch the nominations from the localstorage and return action object
export const fetchNominations = (): Action => {
  const response = getStorageData();
  return {
    type: ActionTypes.FETCH_NOMINATIONS,
    payload: response,
  };
};

// save a nominated movie in the localstorage
export const setNomination = (movie: Movie, imdbID: string): Action => {
  const nominations = getStorageData();
  nominations.push(movie);
  setStorageData(nominations);
  return {
    type: ActionTypes.NOMINATE_MOVIE,
    payload: nominations,
  };
};

// delete a nomination from the localstorage
export const deleteNomination = (imdbID: string): Action => {
  const nominations = getStorageData().filter(
    (nomination) => nomination.imdbID !== imdbID
  );
  setStorageData(nominations);
  return {
    type: ActionTypes.DELETE_NOMINATION,
    payload: imdbID,
  };
};

// utility functions
const getStorageData = (): Movie[] => {
  let response = localStorage.getItem('nomination');
  if (response) {
    return JSON.parse(response);
  }
  return [];
};

const setStorageData = (data: Movie[]): void => {
  localStorage.setItem('nomination', JSON.stringify(data));
};
