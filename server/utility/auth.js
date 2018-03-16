import { ENABLE_AUTH } from '../config/app';

export const mustLoginMiddleware = ({realm = 'xhr'} = {}) => (req, res, next) => {
  if (req.bearerAuthenticated || !ENABLE_AUTH) {
    next();
  } else {
    res.setHeader('WWW-Authenticate', `Bearer realm="${realm}"`);
    res.status(401).json({ error: 'must be logged in' });
  }
};

export const mustLoginMiddlewareWhitelist = ({realm = 'xhr', selector = () => {}, whitelist = []}) => (req, res, next) => {
  if (req.bearerAuthenticated || !ENABLE_AUTH) { // if cookie authenticated, they're good
    next();
  } else if (whitelist.includes(selector(req))) { // if the selector returned a value in the whitelist (i.e. slug of page === 'login' which is in whitelist)
    next();
  } else {
    res.setHeader('WWW-Authenticate', `Bearer realm="${realm}"`);
    res.status(401).json({ error: 'must be logged in' });
  }
};
