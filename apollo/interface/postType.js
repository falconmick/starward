const PostType = `
interface PostType {
    id: ID!
    # in UTC time
    created: Date!
    # in UTC time
    modified: Date!
    guid: WpContent
    slug: String!
    status: String!
    type: String!
    link: String!
    title: String!
    content: String!
    yoast: Yoast!
    acf: Acf!
}
`;

export default () => [PostType];
