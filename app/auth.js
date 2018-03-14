import axios from 'axios';

const selectToken = state => {
  const { wpJwt } = state || {};
  const { token } = wpJwt || {};
  return token;
};

const updateJwtTokenInAxios = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    console.log('Authorization: ', axios.defaults.headers.common.Authorization);
  } else {
    axios.defaults.headers.common.Authorization = null;
    console.log('Undefined Authorization');
  }
};

export const jwtStoreListener = (store) => {
  let currentToken;

  const subscribeFunc = () => {
    const previousToken = currentToken;
    currentToken = selectToken(store.getState());

    if (previousToken !== currentToken) {
      updateJwtTokenInAxios(currentToken);
    }
  };

  store.subscribe(subscribeFunc);
};
