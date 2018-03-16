import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_START,
  LOGIN_COOKIE_SET,
} from '../actions/types';

const INITIAL_STATE = { token: '', isLoggedIn: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_START:
      return state;
    case LOGIN_COOKIE_SET:
    case LOGIN_SUCCESS:
      return {
        token: action.token,
        isLoggedIn: true,
      };
    case LOGIN_FAILURE:
      return {...INITIAL_STATE};
    default:
      return state;
  }
}
