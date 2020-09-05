import { Error, Action, ActionTypes } from '../actions';

const errorInitialState: Error = {
  error: false,
  message: '',
};

export const errorReducer = (state = errorInitialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_MOVIES_FAILURE:
      return action.payload;
    case ActionTypes.RESET_ERROR:
      return action.payload;
    default:
      return state;
  }
};
