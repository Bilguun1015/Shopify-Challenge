export enum ActionTypes {
  FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS',
  FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE',
  FETCH_NOMINATIONS = 'FETCH_NOMINATIONS',
  NOMINATE_MOVIE = 'NOMINATE_MOVIE',
  RESET_ERROR = 'RESET_ERROR',
}

export interface Error {
  error: boolean;
  message: string;
}

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export type Key = {
  [key: string]: number;
};

interface FetchMoviesAction {
  type: ActionTypes.FETCH_MOVIES_SUCCESS;
  payload: Movie[];
}

interface FetchMoviesFailure {
  type: ActionTypes.FETCH_MOVIES_FAILURE;
  payload: Error;
}

interface FetchNominations {
  type: ActionTypes.FETCH_NOMINATIONS;
  payload: Movie[];
}

interface NominateMoive {
  type: ActionTypes.NOMINATE_MOVIE;
  payload: Movie[];
}

interface ResetError {
  type: ActionTypes.RESET_ERROR;
  payload: Error;
}

export type Action =
  | FetchMoviesAction
  | FetchMoviesFailure
  | FetchNominations
  | NominateMoive
  | ResetError;
