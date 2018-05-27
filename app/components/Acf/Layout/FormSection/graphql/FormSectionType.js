// NOTE: Cannot import this inside of web app or redis will be included, which obviously doesn't work on client side!!
import { wrapFlexibleContentGraphQL } from '../../util';
import { resolvers } from './formSectionResolvers';

const FormSection = `
type FormSection {
  form: Form
  showTitle: Boolean
  showDescription: Boolean
}
`;

const type = () => [FormSection];
const typeName = 'FormSection';

export const formSection = wrapFlexibleContentGraphQL({type, typeName, resolvers});
