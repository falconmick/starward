import jwt from 'jsonwebtoken';
import { JWT_AUTH_SECRET_KEY } from '../config/app';
import * as types from '../../app/actions/types';
import { isDebug } from '../../app/config/app';

// you MUST verify that only the HS256 algorythm is used
// otherwise attackers can send up a crafted token which
// uses the none algorythm which would basically let them
// make whatever token they want and our verify would trust it :(
const jwtVerifyOptions = {
  algorithms: ['HS256'],

};

export const extractUser = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_AUTH_SECRET_KEY, jwtVerifyOptions, (err, decodedToken) => {
      if (err) {
        return reject(err);
      }

      const { data: userData, roles, claims, exp } = decodedToken;
      const { user } = userData || {};
      const jwtUserData = {
        ...user,
        roles,
        claims,
        exp,
        jwt: token, // encase the API is requesting this API we will attach the users jwt token for easy access
      };

      return resolve(jwtUserData);
    });
  });
};

// When making the initial request cookies are the only way to achieve SSR login based rendering
// DO NOT TRUST cookieAuthenticated in anything other than data-viewing related work (i.e. app.get() not app.post))
export const extractUserFromCookie = (req, res, next) => {
  const jwtToken = isDebug ? req.signedCookies['jwt_token'] : req.signedCookies['__Secure-jwt_token'];
  if (jwtToken && jwtToken !== '') {
    extractUser(jwtToken)
    .then(user => {
      req.cookieAuthenticated = !!user;
      if (req.cookieAuthenticated) {
        req.user = user;
      }

      next();
    }).catch(() => {
      req.cookieAuthenticated = false;

      next();
    });
  } else {
    req.cookieAuthenticated = false;

    next();
  }
};
