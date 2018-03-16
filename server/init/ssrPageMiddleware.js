import { mustLoginHttpMiddleware, mustLoginHttpMiddlewareWhitelist } from '../utility/auth';
import { extractUserFromCookie } from '../wpJwt/extractUser';
import renderMiddleware from '../render/middleware';
import { LOGIN_SLUG } from '../../app/config/app';

export const initSsrPageMiddleware = app => {
  // to make requests for data we must extract the jwt token from the cookie,
  // this enables renderMiddleware to do so
  app.get('*', extractUserFromCookie, renderMiddleware);
};
