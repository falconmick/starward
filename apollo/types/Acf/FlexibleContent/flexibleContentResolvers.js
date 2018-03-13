const queryableRegex = /^__queryable__/g;

export const resolvers = {
  FlexibleContent: {
    // if acf_fc_layout doesn't start with __queryable__, place it here
    autoFields: ({acf_fc_layout: rawAcfLayoutName, ...fields}) => {
      const acfLayoutName = rawAcfLayoutName.replace(queryableRegex, '');

      // replace removed nothing, it's an auto
      if (acfLayoutName === rawAcfLayoutName) {
        return { acf_fc_layout: acfLayoutName, ...fields };
      }

      return null;
    },
    // if acf_fc_layout starts with __queryable__, place it here
    queryable: ({acf_fc_layout: rawAcfLayoutName, ...fields}) => {
      const acfLayoutName = rawAcfLayoutName.replace(queryableRegex, '');

      // replace removed our __queryable__, user is trying to query more data!
      if (acfLayoutName !== rawAcfLayoutName) {
        return { acf_fc_layout: acfLayoutName, ...fields }; // remove __queryable__
      }

      return null;
    },
  }
};
