import { merge } from 'lodash';

const flatten2dModule = (accumulator, module) => {
  return [...accumulator, ...module.type];
};

// given an array of apolloBundles, will merge the types and resolvers
// ready for schema.js. the result of this can be combined with other results of this function
// and called again to merge two modules.
export const apolloModule = (...apolloBundles) => (rootQuery) => (rootMutation) => {
  // a common pattern is to place all modules inside of a directory, by checking for __re... it allows
  // us to filter out any index folders that are not designed to be used with this bundler. Also stops
  // people for accidentally using this when they shouldn't.
  const validModules = apolloBundles.filter(bundle => bundle.__registered_with_apollo_bundle__);
  return {
    __registered_with_apollo_module__: true,
    type: validModules.reduce(flatten2dModule, []),
    resolvers: merge(...validModules.map(module => module.resolvers).filter(resolver => resolver)),
    rootQuery,
    rootMutation,
  };
};

export const combineModules = (...apolloModules) => {
  const validModules = apolloModules.filter(bundle => bundle.__registered_with_apollo_module__);
  const rootQueryType = `
    type RootQuery {
      ${validModules.map(module => module.rootQuery).join('\n')}
    }
  `;
  const rootMutationType = `
    type RootMutation {
      ${validModules.map(module => module.rootMutation).join('\n')}
    }
  `;

  return {
    __registered_with_apollo_module_combine__: true,
    type: validModules.reduce(flatten2dModule, []),
    resolvers: merge(...validModules.map(module => module.resolvers).filter(resolver => resolver)),
    rootQueryType,
    rootMutationType,
  };
};
