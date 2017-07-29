import md5 from 'md5';

export const createPagableType = (dataType) => {
  const typeName = `${dataType}Pager`;
  const typeDefinition = `
    type ${typeName} {
      # the args used to generate the pages are base64 encoded here
      id: ID!
      page: Int!
      perPage: Int!
      totalPages: Int!
      totalItems: Int!
      pageData: [${dataType}]
    }
  `;
  return () => [typeDefinition];
};

export const createIdFromArgs = (...args) => {
  const csl = args.join(':');
  return md5(csl);
};

// wraps the data inside of a pagination based schema. the id
// you pass down should be a combination of pagination data +
// any query params used to get that data. The id must be unique
// for that page for caching to work in apollo. As of yet I am
// not taking advantage of this, but I imagine that if you were
// to use the same id as generated it would fetch the same result
export const createPaginationCallback = (page, perPage, id) => {
  return (data, { headers }) => {
    return {
      id,
      page,
      perPage,
      totalPages: +headers['x-wp-totalpages'],
      totalItems: +headers['x-wp-total'],
      pageData: data,
    };
  };
};
