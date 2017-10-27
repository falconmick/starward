import express from 'express';
import webpack from 'webpack';
import { isDebug } from '../app/config/app';
import initExpress from './init/express';
import initRoutes from './init/routes';
import {initApollo, initApolloDebug} from './init/apollo';
import renderMiddleware from './render/middleware';
import flushRedisEndpoint from './init/flushRedisEndpoint';
import { redisClient } from './redis';

global.fetch = require('node-fetch');

const app = express();

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
 * Setup Apollo GraphQL + GraphQLi (if debug)
 */
if (isDebug) {
  initApolloDebug(app, redisClient);
} else {
  initApollo(app);
}

/*
 * Bootstrap application settings
 */
initExpress(app);

/*
 * Setup Flush redis API endpoint
 */
flushRedisEndpoint(app, redisClient);

/*
 * REMOVE if you do not need any routes
 *
 * Note: Some of these routes have passport and database model dependencies
 */
initRoutes(app);

/*
 * This is where the magic happens. We take the locals data we have already
 * fetched and seed our stores with data.
 * renderMiddleware matches the URL with react-router and renders the app into
 * HTML
 */
app.get('*', renderMiddleware(redisClient));

app.listen(app.get('port'));
