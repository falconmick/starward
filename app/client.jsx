import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ApolloProvider } from 'react-apollo';
import createRoutes from './routes';
import * as types from './actions/types';
import configureStore from './utils/configureStore';
import fetchDataForRoute from './utils/fetchDataForRoute';
import fetchDataForApp from './utils/fetchDataForApp';
import { createClient } from '../apollo/createClient';
// eslint-disable-next-line no-unused-vars
import styles from '../public/assets/sass/styles.scss';

// Grab the state from a global injected into
// server-generated HTML
const initialState = window.__INITIAL_STATE__;
const apolloClient = createClient();

const store = configureStore(initialState, browserHistory, apolloClient);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store);

function requestSuccess(state, appData) {
  fetchDataForRoute(state)
  .then(data => store.dispatch({ type: types.REQUEST_SUCCESS, payload: {...data, ...appData} }));
}

/**
 * Callback function handling frontend route changes.
 */
function onUpdate() {
  // Prevent duplicate fetches when first loaded.
  // Explanation: On server-side render, we already have __INITIAL_STATE__
  // So when the client side onUpdate kicks in, we do not need to fetch twice.
  // We set it to null so that every subsequent client-side navigation will
  // still trigger a fetch data.
  // Read more: https://github.com/choonkending/react-webpack-node/pull/203#discussion_r60839356
  if (window.__INITIAL_STATE__ !== null) {
    window.__INITIAL_STATE__ = null;
    return;
  }
  // Reset scroll position
  window.scrollTo(0, 0);
  // Handle data fetcher Redux actions
  store.dispatch({ type: types.CREATE_REQUEST });
  if (this.state.routes[0].name === 'App') {
    fetchDataForApp(this.state)
    .then(settings => {
      requestSuccess(this.state, settings);
    });
  } else {
    requestSuccess(this.state);
  }
}

// Router converts <Route> element hierarchy to a route config:
// Read more https://github.com/rackt/react-router/blob/latest/docs/Glossary.md#routeconfig
render(
  <ApolloProvider store={store} client={apolloClient}>
    <Router history={history} onUpdate={onUpdate}>
      {routes}
    </Router>
  </ApolloProvider>, document.getElementById('app'));
