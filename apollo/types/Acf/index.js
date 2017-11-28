import { apolloBundle } from '../../utils/apolloBundle';

const Acf = `
type Acf {
  layout: RawJson
}
`;

export const AcfBundle = apolloBundle({
  type: Acf,
});
