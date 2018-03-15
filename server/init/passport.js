import passport from 'passport';
import passportHttpBearer from 'passport-http-bearer';
import { extractUser } from '../wpJwt/extractUser';

// req.bearerAuthenticated to signify that the request was Authenticated by bearer auth
// http auth will use: req.httpAuthenticated
export const authenticateBearerUser = (req, res, next) => {
  (passport.authenticate('bearer', { session: false }, (err, user, info) => {
    req.bearerAuthenticated = !!user;

    if (req.bearerAuthenticated) {
      req.user = user;
    }

    next();
  }))(req, res, next);
};


export const initPassport = () => {
  //
  // API autentication START
  //
  passport.use(new passportHttpBearer.Strategy(
    (token, cb) => {
      extractUser(token)
        .then(user => cb(null, user))
        .catch(err => cb(err));
    }
  ));
};
