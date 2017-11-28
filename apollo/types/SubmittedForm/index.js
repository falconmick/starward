import SubmitField from './SubmitField/index';
import FormValidation from './FormValidation/index';
import { resolvers } from './submittedFormResolver';
import { apolloBundle } from '../../utils/apolloBundle';

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
    fields: String!
    isValid: Boolean!
    validation: [FormValidation!]
}
input SubmittedFormInput {
    id: ID!
    fields: String!
}
`;

export const SubmittedFormBundle = apolloBundle({
  type: SubmittedForm,
  dependencies: [SubmitField, FormValidation],
  resolvers,
});
