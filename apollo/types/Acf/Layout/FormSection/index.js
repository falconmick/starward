import Form from '../../../Form';

const FormSection = `
type FormSection {
  form: Form
  showTitle: Boolean
  showDescription: Boolean
}
`;


export default () => [FormSection, Form];
export { resolvers } from './formSectionResolvers';
