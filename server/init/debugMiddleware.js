import webpack from 'webpack';
import { isDebug } from '../../app/config/app';

export const initDebugMiddleware = app => {
  if (isDebug) {
    const webpackDevConfig = require('../../webpack/webpack.config.dev-client');

    const compiler = webpack(webpackDevConfig);
    app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackDevConfig.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler));
  }

};
