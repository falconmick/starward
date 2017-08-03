import React from 'react';
import Helmet from 'react-helmet';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import ReactDOMServer from 'react-dom/server';
import { RouterContext } from 'react-router';

const createApp = (store, props, apolloClient, resCallback) => {
  if (!apolloClient) {
    throw new Error('Page Renderer needs an apollo client');
  }
  try {
    const app = (
      <ApolloProvider store={store} client={apolloClient}>
        <RouterContext {...props} />
      </ApolloProvider>
    );
    getDataFromTree(app).then(() => {
      const initialState = store.getState();
      const html = ReactDOMServer.renderToString(app);
      resCallback(html, initialState);
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

const buildPage = ({ html = '', initialState = {}, headAssets}) => {
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
    <script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>
  </body>
</html>`;
};

export default (store, props, apolloClient, resCallback) => {
  const headAssets = Helmet.rewind();
  createApp(store, props, apolloClient, (html, initialState) => {
    resCallback(buildPage({ html, initialState, headAssets }));
  });
};
