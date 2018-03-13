import { ApolloClient } from 'apollo-client';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { createHttpLink } from 'apollo-link-http';
import { toIdValue } from 'apollo-utilities';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { GRAPHQL_ENDPOINT } from '../app/config/app';
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
const cacheResolvers = {
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

export const createClient = (apolloState) => {
  const link = new BatchHttpLink({
    uri: GRAPHQL_ENDPOINT,
    batchInterval: 1,  // in milliseconds I break my queries into small chunks for better caching, 1ms is long enough to add them all together
    batchMax: 10,
  });
  const cache = new InMemoryCache({dataIdFromObject, cacheResolvers}).restore(apolloState);
  return new ApolloClient({
    link,
    cache,
  });
};

export const createSsrClient = (req) => {
  const link = createHttpLink({
    uri: GRAPHQL_ENDPOINT,
    credentials: 'same-origin',
    headers: {
      cookie: req.header('Cookie'),
    },
  });
  const cache = new InMemoryCache({dataIdFromObject, cacheResolvers});
  return new ApolloClient({
    link,
    cache,
    ssrMode: true,
  });
};
