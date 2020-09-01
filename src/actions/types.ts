import { FetchMoviesAction, FetchMoviesFailure } from './movies';

import { FetchMoviesAction, FetchMoviesFailure } from './movies';

export enum ActionTypes {
  FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS',
  FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE',
}

export type Action = FetchMoviesAction | FetchMoviesFailure;
