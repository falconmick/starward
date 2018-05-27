import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { toIdValue } from 'apollo-utilities';
import { InMemoryCache, defaultDataIdFromObject, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { GRAPHQL_ENDPOINT, isProduction } from '../app/config/app';
import { createPostPagerKey } from './utils/pager';

// export const createSsrClient = (req) => {
//   const networkInterface = createNetworkInterface({
//     uri: GRAPHQL_ENDPOINT,
//     opts: {
//       credentials: 'same-origin',
//       // transfer request headers to networkInterface so that they're accessible to proxy server
//       // Addresses this issue: https://github.com/matthew-andrews/isomorphic-fetch/issues/83
//       headers: req.headers,
//     },
//   });
//
//   return new ApolloClient({
//     ssrMode: true,
//     networkInterface,
//     reduxRootSelector: state => state.apolloReducer// your apollo reducer key
//   });
// };

// export const createClient = () => {
//   const networkInterface = createBatchingNetworkInterface({
//     uri: GRAPHQL_ENDPOINT,
//     batchInterval: 1,  // in milliseconds I break my queries into small chunks for better caching, 1ms is long enough to add them all together
//     batchMax: 10,
//   });
//
//   return new ApolloClient({
//     networkInterface,
//     reduxRootSelector: state => state.apolloReducer// your apollo reducer key
//   });
// };

// some Types as such as field, use id's that are not unique. For this reasons specific types MUST
// supply an alternate key if they are to be normalised.
// Otherwise if you have nested objects with no keys, return null to force them to be based off it's containing type
// i.e. Form Fields!
const dataIdFromObject = object => {
  const { __typename: typeName } = object;
  switch (typeName) {
    case 'Field': return null; // this has no cache key, so therefore we must base it off of it's parent field
    default: return defaultDataIdFromObject(object); // fall back to default handling
  }
};

// Used to resolve queries that already exist in the cache for the Root Queries.
//
// but why do we need this? For example:
// you have an ACF field that returns a From, if you specify the query for that ACF field inside of the
// FlexibleContentUnion the data for that form would have already resolved by one of GraphQL's greatest
// features, querying through resolvers! Basically, before GraphQL you would do the following:
// 1. Fetch page data
// 2. Mount ACF fields returned
// 3. Field 3 has a FormComponent that requires a form by ID
// 4. Fetch Form data
// 5. Mount Form
//
// With resolvers powered by the FlexibleContentUnion, you can remove a request to the server (and that horrible loading state)
// 1. Fetch page data (server recognises that one of the components being returned is a FormComponent and therefore
//    Requires that we download that form at the same time!
// 2. Mount ACF fields returned
// 3. Field 3 has a FormComponent that requires a form by ID
// 4. cacheResolvers creates the key that matches the form returned by the first query and thus uses this Form
//
// I have also created the posts and pages resolver as an example of how to resolve paged data. For example you might
// have a RecentPosts ACF component, now once you have created a RecentPosts Type (see FormSection for the form version)
// you would add it to FlexibleContentUnion, now RecentPosts would have a query inside it's apolloGraphql() that used the posts
// query!
//
// TLDR: cacheResolvers map data returned by page ACF requests to the schemas RootQuery.
// todo: Move to the Types folders and integrate with module system.
const cacheRedirects = {
  Query: {
    form: (_, {formId}) => {
      return toIdValue(defaultDataIdFromObject({ __typename: 'Form', id: formId }));
    },
    posts: (_, {query, page, perPage}) => {
      const id = createPostPagerKey({page, perPage, query});
      return toIdValue(defaultDataIdFromObject({ __typename: 'PostPager', id }));
    },
    pages: (_, {query, page, perPage}) => {
      const id = createPostPagerKey({page, perPage, query});
      return toIdValue(defaultDataIdFromObject({ __typename: 'PagePager', id }));
    },
  },
};

// on uncaught errors, look for sings of common issues and handle them
const meaningfullErrorLogs = ({isClient = false} = {}) => onError(err => {
  const { graphQLErrors } = err;

  // if it's the client on production we don't want to spam
  if (isClient && isProduction) {
    return;
  }

  const meaningfullErrors = [];
  // if any of the error messages contain ECONNREFUSED, mamp or the web server isn't accessable
  if (graphQLErrors.map(({ message }) => message).some(message => message.includes('ECONNREFUSED'))) {
    meaningfullErrors.push('We couldn\'t reach one of the API\'s that GraphQL relies on, is the web server running?');
    meaningfullErrors.push('Try checking that the server is available, or perhaps you need to turn MAMP on');
    meaningfullErrors.push('\r\n');
  }

  if (meaningfullErrors.length) {
    console.log('==================================================================');
    console.log('=======================Meaningful Error Message===================');
    console.log('==================================================================');
    meaningfullErrors.forEach(message => console.log(message));
    console.log('==================================================================');
    console.log('==================================================================');
  }
});

export const createClient = (apolloState, fragmentTypes) => {
  const httpLink = new BatchHttpLink({
    uri: GRAPHQL_ENDPOINT,
    batchInterval: 1,  // in milliseconds I break my queries into small chunks for better caching, 1ms is long enough to add them all together
    batchMax: 10,
  });
  const link = ApolloLink.from([
    meaningfullErrorLogs({isClient: true}),
    httpLink,
  ]);

  // In memory cache doesn't know about our Unions and Interfaces and therefore cannot
  // properly cache anything that uses them, for that reason we pass a schema down
  // to the client so that it can match the cache properly using __typename
  // see https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: fragmentTypes
  });
  const cache = new InMemoryCache({dataIdFromObject, cacheRedirects, fragmentMatcher}).restore(apolloState);
  return new ApolloClient({
    link,
    cache,
  });
};

export const createSsrClient = (req, fragmentTypes) => {
  const httpLink = createHttpLink({
    uri: GRAPHQL_ENDPOINT,
    credentials: 'same-origin',
    headers: {
      cookie: req.header('Cookie'),
    },
  });
  const link = ApolloLink.from([
    meaningfullErrorLogs(),
    httpLink,
  ]);
  // In memory cache doesn't know about our Unions and Interfaces and therefore cannot
  // properly cache anything that uses them, for that reason we pass a schema down
  // to the client so that it can match the cache properly using __typename
  // see https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: fragmentTypes
  });
  const cache = new InMemoryCache({dataIdFromObject, cacheRedirects, fragmentMatcher});
  return new ApolloClient({
    link,
    cache,
    ssrMode: true,
  });
};
