export enum ActionTypes {
  FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS',
  FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE',
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

export type Action = FetchMoviesAction | FetchMoviesFailure;
