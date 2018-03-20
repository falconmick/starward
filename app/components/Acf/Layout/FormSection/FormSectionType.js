const FormSection = `
type FormSection {
  form: Form
  showTitle: Boolean
  showDescription: Boolean
}
`;


export default () => [FormSection];
export { resolvers } from './formSectionResolvers';
