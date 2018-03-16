import axios from 'axios';
import {
  LOGIN_START,
  LOGIN_FAILURE,
  LOGIN_SUCCESS, SUBMIT_FORM, SUBMIT_FORM_SUCCESS, SUBMIT_FORM_FAILURE
} from './types';

import { ROOT_API } from '../config/app';

// submit form id if you wish to also update form redux
export const login = ({fields, formId}) => {
  return (dispatch) => {
    const submitGravityActions = typeof formId !== 'undefined';

    dispatch({ type: LOGIN_START });
    if (submitGravityActions) {
      dispatch({ type: SUBMIT_FORM, key: formId });
    }
    const loginUrl = `${ROOT_API}/login`;
    axios.post(loginUrl, fields)
      .then(({data}) => {
        const { token } = data;
        if (data.success) {
          dispatch({type: LOGIN_SUCCESS, token });
          if (submitGravityActions) {
            dispatch({type: SUBMIT_FORM_SUCCESS, key: formId });
          }
          window.location.href = '/';
        }
      })
      .catch(() => {
        dispatch({type: LOGIN_FAILURE});
        if (submitGravityActions) {
          dispatch({type: SUBMIT_FORM_FAILURE, key: formId});
        }
      });
  };
};
