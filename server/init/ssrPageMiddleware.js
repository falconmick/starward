import { mustLoginHttpMiddleware } from '../utility/auth';
import { extractUserFromCookie } from '../wpJwt/extractUser';
import renderMiddleware from '../render/middleware';

export const initSsrPageMiddleware = app => {
  // if user needs to login, parse any auth cookies they have (to show logout or login)
  app.get('/login', extractUserFromCookie, renderMiddleware);
  // all other routes MUST be authenticated by a JWT cookie, if you want to limit access to specific
  // pages, you will need to modify 'api/page' to apply Authorisation.
  app.get('*', renderMiddleware);
  // app.get('*', extractUserFromCookie, mustLoginHttpMiddleware({failureRedirect: '/login'}), renderMiddleware);
};
