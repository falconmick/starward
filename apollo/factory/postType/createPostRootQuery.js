export const createRootQuery = ({singleQueryName, archiveQueryName, typeName}) => (`
  ${singleQueryName}(slug: String!): ${typeName}
  ${archiveQueryName}(query: String, page: Int, perPage: Int): ${typeName}Pager
`);
