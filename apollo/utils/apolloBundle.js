// used to shape apollo graphql parts into a consumable shape.
const _apolloBundle = ({type, resolvers}) => {
  if (typeof type === 'undefined') {
    throw new Error('you must provide a type');
  }
  // if resolvers were passed down, they must be of type object (i.e. no strings)
  if (typeof resolvers !== 'undefined' && typeof resolvers !== 'object') {
    throw new Error('resolvers must be an object or empty');
  }
  return {
    __registered_with_apollo_bundle__: true,
    type: [type],
    resolvers,
  };
};

export const apolloBundle = _apolloBundle;
