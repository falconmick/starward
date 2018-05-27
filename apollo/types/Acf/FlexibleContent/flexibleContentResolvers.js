// we need to do this as if no FlexibleContentUnion matches the field passed down it MUST belong to autoFields
// however if the content does match a part of the FlexibleContentUnion then we want it to be passed down to queryable

export const resolvers = {
  FlexibleContent: {
    autoFields: (fields) => {
      return fields;
    },
    queryable: (fields) => {
      return fields;
    },
  }
};
