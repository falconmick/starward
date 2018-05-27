import axios from 'axios';
import { createMemoryHistory, match } from 'react-router';
import createRoutes from '../../app/routes';
import configureStore from '../../app/utils/configureStore';
import { baseURL, GRAPHQL_ENDPOINT } from '../../app/config/app';
import { REDIS_PREFIX } from '../config/app';
import pageRenderer from './pageRenderer';
import fetchDataForRoute from '../../app/utils/fetchDataForRoute';
import fetchDataForApp from '../../app/utils/fetchDataForApp';
import { redisConfig } from '../redis';
import { environment } from '../utility';
import { createSsrClient as createClient } from '../../apollo/createClient';
import { fragmentTypeGenerator } from '../../apollo/utils/fragmentTypeGenerator';

// configure baseURL for axios requests (for serverside API calls)
axios.defaults.baseURL = baseURL;

// you must set the redis prefix if you want to use redis
if (environment.isRedisEnabled && !REDIS_PREFIX) {
  throw new Error('REDIS_PREFIX needs to be configured in app.js for redis to work');
}

/*
 * Export render function to be used in server/config/routes.js
 * We grab the state passed in from the server and the req object from Express/Koa
 * and pass it into the Router.run function.
 */
export default (redisClient) => async (req, res) => {
  const history = createMemoryHistory();

  // In memory cache doesn't know about our Unions and Interfaces and therefore cannot
  // properly cache anything that uses them, for that reason we pass a schema down
  // to the client so that it can match the cache properly using __typename
  // see https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher
  const fragmentTypes = await fragmentTypeGenerator(GRAPHQL_ENDPOINT);
  const apolloClient = createClient(req, fragmentTypes);
  const store = configureStore({}, history);
  const routes = createRoutes(store);

  /*
   * From the react-router docs:
   *
   * This function is to be used for server-side rendering. It matches a set of routes to
   * a location, without rendering, and calls a callback(err, redirect, props)
   * when it's done.
   *
   * The function will create a `history` for you, passing additional `options` to create it.
   * These options can include `basename` to control the base name for URLs, as well as the pair
   * of `parseQueryString` and `stringifyQuery` to control query string parsing and serializing.
   * You can also pass in an already instantiated `history` object, which can be constructed
   * however you like.
   *
   * The three arguments to the callback function you pass to `match` are:
   * - err:       A javascript Error object if an error occurred, `undefined` otherwise.
   * - redirect:  A `Location` object if the route is a redirect, `undefined` otherwise
   * - props:     The props you should pass to the routing context if the route matched,
   *              `undefined` otherwise.
   * If all three parameters are `undefined`, this means that there was no route found matching the
   * given location.
   */

  function requestSuccess(props) {
    fetchDataForRoute(props)
      .then(data => {
        const status = data && data.handle404 ? 404 : 200;
        pageRenderer(store, props, apolloClient, fragmentTypes, (html) => {
          res.status(status).send(html);
          const redisKey = props.location.pathname;
          const isPreview = props.location.query.preview;
          // update cache with html after returning it to the client so they don't need to wait
          if (!isPreview) redisClient.setex(redisKey, redisConfig.redisLongExpiry, html);
        });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json(err);
      });
  }
  match({routes, location: req.url}, (err, redirect, props) => {
    if (err) {
      res.status(500).json(err);
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else if (props) {
      redisClient.get(props.location.pathname)
        .then(cacheResult => {
          const { cacheHit, result } = cacheResult;
          if (cacheHit) {
            res.status(200).send(result);
          } else if (props.routes[0].name === 'App') {
            fetchDataForApp(props)
              .then(settings => {
                requestSuccess(props, settings);
            });
          } else {
            requestSuccess(props);
          }
        })
        .catch(cacheError => {
          res.status(500).json({});
        });
    } else {
      res.sendStatus(404);
    }
  });
}
