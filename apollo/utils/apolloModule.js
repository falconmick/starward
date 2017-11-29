import { merge } from 'lodash';

// given an array of apolloBundle or apolloModules, will merge the types and resolvers
// ready for schema.js. the result of this can be combined with other results of this function
// and called again to merge two modules.
const _apolloModule = (...apolloBundles) => {
  // a common pattern is to place all modules inside of a directory, by checking for __re... it allows
  // us to filter out any index folders that are not designed to be used with this bundler. Also stops
  // people for accidentally using this when they shouldn't.
  const validModules = apolloBundles.filter(bundle => bundle.__registered_with_apollo_bundle__ || bundle.__registered_with_apollo_module__);
  return {
    __registered_with_apollo_module__: true,
    type: validModules.reduce((accumulator, module) => {
      return [...accumulator, ...module.type];
    }, []),
    resolvers: merge(...validModules.map(module => module.resolvers).filter(resolver => resolver)),
  };
};

export const apolloModule = _apolloModule;
export default _apolloModule;
