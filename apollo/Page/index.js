

const Page = `
type Page {
    id: Int!,
    date: Date!,
    date_gmt: Date!
}
`;

export default () => [Page];
export { resolvers } from './pageResolvers';
