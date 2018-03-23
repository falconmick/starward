export const createType = ({typeName, singleQueryName, archiveQueryName}) => (`
type ${typeName} implements Taxonomy {
    id: ID!
    count: Int!
    description: String!
    link: String!
    name: String!
    slug: String!
    taxonomy: String!
    parent: Int!
    yoast: Yoast!
}

extend type RootQuery {
  ${singleQueryName}(id: Int!): ${typeName}
  ${archiveQueryName}(listOfIds: [Int!]): [${typeName}]
}
`);