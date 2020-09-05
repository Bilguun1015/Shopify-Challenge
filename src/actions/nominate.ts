import { Movie, ActionTypes, Action } from './types';

export const fetchNominations = (): Action => {
  const response = getStorageData();
  return {
    type: ActionTypes.FETCH_NOMINATIONS,
    payload: response,
  };
};

export const setNomination = (movie: Movie, imdbID: string): Action => {
  const nominations = getStorageData();
  nominations.push(movie);
  setStorageData(nominations);
  return {
    type: ActionTypes.NOMINATE_MOVIE,
    payload: nominations,
  };
};

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
