export const createRootQuery = ({singleQueryName, archiveQueryName, typeName}) => (`
  ${singleQueryName}(id: Int!): ${typeName}
  ${archiveQueryName}(listOfIds: [Int!]): [${typeName}]
`);
