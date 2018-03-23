const queryableRegex = /^__queryable__/g;

// because we prefix queryables with __queryable__, we MUST replace the __resolveType with what it would have
export const resolvers = { // been without our prefix, so that Page's acf render can look for the name without prefix
  FlexibleContentUnion: {
    __resolveType: ({acf_fc_layout: rawAcfLayoutName}) => {
      const acfLayoutName = rawAcfLayoutName ? rawAcfLayoutName.replace(queryableRegex, '') : 'EmptyType';
      return acfLayoutName;
    },
  }
};
