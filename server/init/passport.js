import passport from 'passport';
import passportHttpBearer from 'passport-http-bearer';
import jwt from 'jsonwebtoken';
import { JWT_AUTH_SECRET_KEY } from '../config/app';

// you MUST verify that only the HS256 algorythm is used
// otherwise attackers can send up a crafted token which
// uses the none algorythm which would basically let them
// make whatever token they want and our verify would trust it :(
const jwtVerifyOptions = {
  algorithms: ['HS256'],

};


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

export const mustLoginXhrMiddleware = (req, res, next) => {
  if (req.bearerAuthenticated) {
    next();
  } else {
    res.setHeader('WWW-Authenticate', 'Bearer realm="need login"');
    res.status(401).json({ error: 'must be logged in' });
  }
};

export const initPassport = () => {
  //
  // API autentication START
  //
  passport.use(new passportHttpBearer.Strategy(
    (token, cb) => {
      // db.users.findByToken(token, (err, user) => {
      //   if (err) { return cb(err); }
      //   if (!user) { return cb(null, false); }
      //   return cb(null, user);
      // });
      jwt.verify(token, JWT_AUTH_SECRET_KEY, jwtVerifyOptions, (err, decodedToken) => {
        if (err) { return cb(err); }

        const { data: userData, roles, claims } = decodedToken;
        const { user } = userData || {};
        const jwtUserData = {
          ...user,
          roles,
          claims,
        };
        return cb(null, jwtUserData);
      });
    }
  ));
};
