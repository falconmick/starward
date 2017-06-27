import Layout from './Layout';

const Page = `
type Page {
    id: Int!,
    date: Date!,
    date_gmt: Date!
    acf: Acf
}
`;

export default () => [Page, Layout];
export { resolvers } from './pageResolvers';
