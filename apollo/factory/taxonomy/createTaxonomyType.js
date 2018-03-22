export const createType = ({typeName}) => (`
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
`);