import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createRoutes from './routes';
import * as types from './actions/types';
import configureStore from './utils/configureStore';
import fetchDataForRoute from './utils/fetchDataForRoute';
import fetchDataForApp from './utils/fetchDataForApp';
import styles from '../public/assets/sass/styles.scss';

const defaultFetchData = () => Promise.resolve();

// Grab the state from a global injected into
// server-generated HTML
const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store);

function allRequestsComplete(appDataPromise, routeDataPromise) {
  Promise.all([appDataPromise, routeDataPromise])
    .then(([appData, routeData]) => {
      store.dispatch({ type: types.REQUEST_SUCCESS, payload: {...routeData, ...appData} });
    });
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
  // Handle data fetcher Redux actions
  store.dispatch({ type: types.RESET_404 });
  store.dispatch({ type: types.CREATE_REQUEST });
  const routeDataPromise = fetchDataForRoute(this.state);
  if (this.state.routes[0].name === 'App') {
    // fetchDataForApp(this.state)
    // .then(settings => {
    //   requestSuccess(this.state, settings);
    // });
    const appDataPromise = fetchDataForApp(this.state);
    allRequestsComplete(appDataPromise, routeDataPromise);
  } else {
    allRequestsComplete(defaultFetchData, routeDataPromise);
  }
}

// Router converts <Route> element hierarchy to a route config:
// Read more https://github.com/rackt/react-router/blob/latest/docs/Glossary.md#routeconfig
render(
  <Provider store={store}>
    <Router history={history} onUpdate={onUpdate}>
      {routes}
    </Router>
  </Provider>, document.getElementById('app'));
