import express from 'express';
import webpack from 'webpack';
import cookieParser from 'cookie-parser';
import { isDebug } from '../app/config/app';
import { COOKIE_SIGNATURE } from './config/app';
import initExpress from './init/express';
import initStarwardRoutes from './init/api';
import renderMiddleware from './render/middleware';
import { authenticateBearerUser, initPassport, mustLoginXhrMiddleware } from './init/passport';

const app = express();


// setup cookies for jwt auth and SSR of logged in areas!!
app.use(cookieParser(COOKIE_SIGNATURE));

if (isDebug) {
  const webpackDevConfig = require('../webpack/webpack.config.dev-client');

  const compiler = webpack(webpackDevConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackDevConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

/*
 * Setup JWT token validation
 */
// todo: add Cookie Strategy and remove custom JWT extraction from middleware.js
initPassport();
// all requests to /api/* must first authenticate (authenticateBearerUser), then must be authorised (mustLoginXhrMiddleware)
app.all('/api/*', authenticateBearerUser, mustLoginXhrMiddleware);

/*
 * Bootstrap application settings
 */

initExpress(app);

/*
 * Starward Setup
 */

initStarwardRoutes(app);

/*
 * UNCOMMENT if you need additional Express routes
 */

// initRoutes(app);

/*
 * This is where the magic happens. We take the locals data we have already
 * fetched and seed our stores with data.
 * renderMiddleware matches the URL with react-router and renders the app into
 * HTML
 */
// todo: create app.get('/login') to allow un-authorised users to login
// todo: create authenticateCookieUser and mustLoginRequestHttpMiddleware to be used like app.all('/api/*
// todo: mustLoginRequestHttpMiddleware will redirect all un-auth trafic to /login
app.get('*', renderMiddleware);

app.listen(app.get('port'));
