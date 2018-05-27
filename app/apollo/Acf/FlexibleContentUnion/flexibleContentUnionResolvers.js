export const createResolvers = (flexibleUnionContentTypes) => {
  const resolvers = { // been without our prefix, so that Page's acf render can look for the name without prefix
    FlexibleContentUnion: {
      __resolveType: ({acf_fc_layout: acfLayoutName}) => {
        // if the acfLayoutName is within the flexibleUnionContentTypes, it must be queryable
        const isFlexibleContent = flexibleUnionContentTypes.some(typeName => typeName === acfLayoutName);
        return isFlexibleContent ? acfLayoutName : 'EmptyType';
      },
    },
    EmptyType: {
      isEmptyType: () => true,
    }
  };

  return resolvers;
};
