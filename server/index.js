import express from 'express';
import cookieParser from 'cookie-parser';
import { COOKIE_SIGNATURE } from './config/app';
import initExpress from './init/express';
import initStarwardRoutes from './init/api';
import { initPassport } from './init/passport';
import { initDebugMiddleware } from './init/debugMiddleware';
import { initSsrPageMiddleware } from './init/ssrPageMiddleware';

const app = express();

/*
 * Setup Cookie Parsing
 */
app.use(cookieParser(COOKIE_SIGNATURE));

/*
 * Setup Debug Middleware
 */
initDebugMiddleware(app);

/*
 * Bootstrap application settings
 */
initExpress(app);

/*
 * Setup passport integration
 */
initPassport();

/*
 * Starward Setup '/api/*'
 */
initStarwardRoutes(app);

/*
 * SSR page rendering
 */
initSsrPageMiddleware(app);

/*
 * Start app
 */
app.listen(app.get('port'));
