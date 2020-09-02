export enum ActionTypes {
  FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS',
  FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE',
  DELETE_MOVIE = 'DELETE_MOVIE',
}

export interface Error {
  error: boolean;
  message: string;
}

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
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

export type Action = FetchMoviesAction | FetchMoviesFailure | DeleteMovieAction;
