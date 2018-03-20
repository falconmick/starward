const queryableRegex = /^__queryable__/g;

export const resolvers = {
  FlexibleContentUnion: {
    __resolveType: ({acf_fc_layout: rawAcfLayoutName}) => {
      const acfLayoutName = rawAcfLayoutName ? rawAcfLayoutName.replace(queryableRegex, '') : 'EmptyType';
      return acfLayoutName;
    },
  }
};
