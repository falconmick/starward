import SubmitField from './SubmitField';
import FormValidation from './FormValidation';

/*
 *Example Useage
mutation SubmitFormMutation($form:SubmittedFormInput!) {
  submitForm(form:$form) {
    id
    fields {
      id
      value
    }
    isValid
    validation {
      message
      fieldId
    }
  }
}
variables:
{
  "form": {
    "id": 1,
    "fields": [
      {
        "id": 1,
        "value": "Hello"
      }
    ]
  }
}
 */
const SubmittedForm = `
type SubmittedForm {
    id: ID!
    fields: [SubmitField!]
    isValid: Boolean!
    validation: [FormValidation!]
}
input SubmittedFormInput {
    id: ID!
    fields: [SubmitFieldInput!]
}
`;

export default () => [SubmittedForm, SubmitField, FormValidation];
export { resolvers } from './submittedFormResolver';
