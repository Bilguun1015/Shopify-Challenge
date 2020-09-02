import { Movie, ActionTypes, Action } from './types';

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

export const setNomination = (imdbID: string): Action => {
  if (!getNomination(imdbID)) {
    const nominations = getNominations();
    if (nominations) {
      nominations.push(imdbID);
      localStorage.setItem('nomination', JSON.stringify(nominations));
    } else {
      const newNomination: string[] = [imdbID];
      localStorage.setItem('nomination', JSON.stringify(newNomination));
    }
  }
  return {
    type: ActionTypes.DELETE_MOVIE,
    payload: imdbID,
  };
};

const getNominations = () => {
  let response = localStorage.getItem('nomination');
  if (response) {
    return JSON.parse(response);
  }
  return;
};
