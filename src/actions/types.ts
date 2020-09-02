export enum ActionTypes {
  FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS',
  FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE',
  DELETE_MOVIE = 'DELETE_MOVIE',
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

interface FetchMoviesAction {
  type: ActionTypes.FETCH_MOVIES_SUCCESS;
  payload: Movie[];
}

interface FetchMoviesFailure {
  type: ActionTypes.FETCH_MOVIES_FAILURE;
  payload: Error;
}

interface DeleteMovieAction {
  type: ActionTypes.DELETE_MOVIE;
  payload: string;
}

interface ResetError {
  type: ActionTypes.RESET_ERROR;
  payload: Error;
}

export type Action =
  | FetchMoviesAction
  | FetchMoviesFailure
  | DeleteMovieAction
  | ResetError;
