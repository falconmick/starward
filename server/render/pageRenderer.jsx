import React from 'react';
import Helmet from 'react-helmet';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import ReactDOMServer from 'react-dom/server';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterContext } from 'react-router';

const createApp = (store, props, apolloClient, resCallback) => {
  if (!apolloClient) {
    throw new Error('Page Renderer needs an apollo client');
  }
  try {
    const app = (
      <ReduxProvider store={store}>
        <ApolloProvider client={apolloClient}>
          <RouterContext {...props} />
        </ApolloProvider>
      </ReduxProvider>
    );
    getDataFromTree(app).then(() => {
      const initialState = store.getState();
      const apolloState = apolloClient.cache.extract();
      const html = ReactDOMServer.renderToString(app);
      const headAssets = Helmet.rewind();
      resCallback(html, initialState, apolloState, headAssets);
    })
    .catch((error) => {
      console.error(error);
      resCallback();
    });
  } catch (error) {
    console.error(error);
    resCallback();
  }
};

const styles = process.env.NODE_ENV === 'production' ? '<link rel="stylesheet" href="/assets/css/styles.css">' : '';

const buildPage = ({ html = '', initialState = {}, apolloState = {}, headAssets}) => {
  return `
<!doctype html>
<html>
  <head>
    ${headAssets.title.toString()}
    ${headAssets.meta.toString()}
    ${headAssets.link.toString()}
    ${styles}
  </head>
  <body>
    <div id="app">${html}</div>
    <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>
    <script>window.__APOLLO_STATE__ = ${JSON.stringify(apolloState).replace(/</g, '\\u003c')}</script>
    <script src="https://cdn.polyfill.io/v2/polyfill.js?features=default,es6"></script>
    <script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>
  </body>
</html>`;
};

export default (store, props, apolloClient, resCallback) => {
  createApp(store, props, apolloClient, (html, initialState, apolloState, headAssets) => {
    resCallback(buildPage({ html, initialState, apolloState, headAssets }));
  });
};
