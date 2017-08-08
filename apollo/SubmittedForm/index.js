import SubmitField from './SubmitField';
import FormValidation from './FormValidation';

const SubmittedForm = `
type SubmittedForm {
    id: ID!
    fields: [SubmitField!]
    isValid: Boolean
    validation: [FormValidation!]
}
`;

export default () => [SubmittedForm, SubmitField, FormValidation];
export { resolvers } from './submittedFormResolver';
