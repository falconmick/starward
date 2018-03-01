import axios from 'axios';
import {
  LOGIN_START,
  LOGIN_FAILURE,
  LOGIN_SUCCESS
} from './types';

import { ROOT_API } from '../config/app';

export function login(fields) {
  return (dispatch) => {
    dispatch({ type: LOGIN_START });
    const loginUrl = `${ROOT_API}/login`;
    axios.post(loginUrl, fields)
      .then(({data}) => {
        if (data.success) dispatch({type: LOGIN_SUCCESS, token: 'tokenhere' });
      })
      .catch(() => dispatch({type: LOGIN_FAILURE}));
  };
}
