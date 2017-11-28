// used to shape apollo graphql parts into a consumable shape.
// only type is required.
// all types referenced inside of dependencies must be listed in an
// array, and even if it's only 1 dependency it MUST be inside an array.
// if you export multiple types from the same index file that you wish
// to be bundling, just include the other types as the first values
// insisde of dependencies
//
// the purpose of this function is to shape data and reduce the
// requirement of understanding to add to the schema. In the end
// all that happens is that all of the types get smooshed into
// the schema and the resolvers are all deep merged together.
// so there is nothing stopping you from defining resolvers
// for other types inside of your resolvers, but its just bad to.
const _apolloBundle = ({type, dependencies = [], resolvers}) => {
  if (typeof type === 'undefined') {
    throw new Error('you must provide a type');
  }
  if (!Array.isArray(dependencies)) {
    throw new Error('dependancies must be an array or empty');
  }
  // if resolvers were passed down, they must be of type object (i.e. no strings)
  if (typeof resolvers !== 'undefined' && typeof resolvers !== 'object') {
    throw new Error('resolvers must be an object or empty');
  }
  return {
    __registered_with_apollo_bundle__: true,
    type: () => [...dependencies, type],
    resolvers,
  };
};

export const apolloBundle = _apolloBundle;
export default _apolloBundle;
