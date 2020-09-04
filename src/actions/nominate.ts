import { Movie, ActionTypes, Action } from './types';
// import { getStorageData } from '../utils/localStorage';

export const getNomination = (key: string): boolean => {
  const data = localStorage.getItem('nomination');
  let nominations: Movie[] = [];
  if (data) {
    nominations = JSON.parse(data);
  }
  nominations.forEach((each) => {
    if (each.imdbID === key) {
      return true;
    }
  });
  return false;
};

export const fetchNominations = (): Action => {
  const response = getStorageData();
  return {
    type: ActionTypes.FETCH_NOMINATIONS,
    payload: response,
  };
};

export const setNomination = (movie: Movie, imdbID: string): Action => {
  // if (!getNomination(imdbID)) {
  let nominations = getStorageData();
  if (nominations) {
    nominations.push(movie);
    localStorage.setItem('nomination', JSON.stringify(nominations));
  } else {
    const newNomination = [movie];
    localStorage.setItem('nomination', JSON.stringify(newNomination));
  }
  const response = getStorageData();
  return {
    type: ActionTypes.NOMINATE_MOVIE,
    payload: response,
  };
};

const getStorageData = (): Movie[] => {
  let response = localStorage.getItem('nomination');
  if (response) {
    return JSON.parse(response);
  }
  return [];
};
