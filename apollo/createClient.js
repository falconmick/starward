import { ApolloClient, createNetworkInterface, createBatchingNetworkInterface } from 'react-apollo';
import { GRAPHQL_ENDPOINT } from '../app/config/app';

export const createSsrClient = (req) => {
  const networkInterface = createNetworkInterface({
    uri: GRAPHQL_ENDPOINT,
    opts: {
      credentials: 'same-origin',
      // transfer request headers to networkInterface so that they're accessible to proxy server
      // Addresses this issue: https://github.com/matthew-andrews/isomorphic-fetch/issues/83
      headers: req.headers,
    },
  });

  return new ApolloClient({
    ssrMode: true,
    networkInterface,
    reduxRootSelector: state => state.apolloReducer// your apollo reducer key
  });
};

export const createClient = () => {
  const networkInterface = createBatchingNetworkInterface({
    uri: GRAPHQL_ENDPOINT,
    batchInterval: 1,  // in milliseconds I break my queries into small chunks for better caching, 1ms is long enough to add them all together
    batchMax: 10,
  });

  return new ApolloClient({
    networkInterface,
    reduxRootSelector: state => state.apolloReducer// your apollo reducer key
  });
};
