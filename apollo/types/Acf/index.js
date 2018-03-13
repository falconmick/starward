import FlexibleContent from './FlexibleContent';

const Acf = `
type Acf {
  layout: [FlexibleContent]!
}
`;

export default () => [Acf, FlexibleContent];
export { resolvers } from './FlexibleContent';
