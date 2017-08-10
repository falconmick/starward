import React, { PureComponent } from 'react';
import {
  gql,
  graphql
} from 'react-apollo';
import { FormError } from './FormError';
import { FormConfirmation } from './FormConfirmation';
import { FormButton } from './Button';
import { RenderFields } from './RenderFields';
import * as FormFields from './Fields';
import { createNewFormValues, extractFormValues } from './Helpers';

class GravityForm extends PureComponent {
  constructor(props) {
    super(props);

    const { form = {} } = props;
    const { fields = [] } = form;
    this.state = {
      submitFailed: false,
      formSubmitted: false,
      formSubmitting: false,
      isValid: false,
      formValues: extractFormValues(fields, []),
    };

    this.getDefaultConfirmationMessage = this.getDefaultConfirmationMessage.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.submit = this.submit.bind(this);
  }

  // todo: add reselect
  getDefaultConfirmationMessage(confirmations) {
    const defaultConfirmation = confirmations.find(confirmation => confirmation.isDefault) || {};

    return defaultConfirmation.message || '';
  }

  updateForm(formValue) {
    const { formValues } = this.state;
    const { form } = this.props;
    const { fields } = form;
    const fieldForFormValue = fields.find(field => field.id === formValue.id);
    // given the field we use for this form value, it's value, and all form values
    // currently stored inside of state
    // remove the old formValue via id, apply field validation, and create a new
    // form values object which contains the old form values + our updated form value
    const newFormFields = createNewFormValues(fieldForFormValue, formValue, formValues);
    this.setState({formValues: newFormFields});
  }

  /*
      id: ID!
    fields: [SubmitField!]
    isValid: Boolean!
    validation: [FormValidation!]
   */
  submit(submitForm, event) {
    event.preventDefault();
    this.setState({formSubmitting: true});
    submitForm()
      .then(({data}) => {
        const { fields, isValid, validation };

        this.setState({formSubmitting: true, submitFailed: !isValid, });
      })
      .catch((error) => {

      });
  }

  render() {
    const { form, showTitle, showDescription, submitForm, errorMessage = 'There was a problem with your submission' } = this.props;
    const { formValues, formSubmitted } = this.state;
    const { title, description, id, button = {}, fields = [], confirmations = [] } = form;
    const confirmationMessage = this.getDefaultConfirmationMessage(confirmations);

    return (
      <div className="form" id={`gravity_form_${id}`}>
        {showTitle ? <h3 className="form_title">{title}</h3> : null}
        {showDescription ? <p className="form_description">{description}</p> : null}
        <FormError
          errorMessage={errorMessage}
          showError={this.state.submitFailed}
        />
        <FormConfirmation
          confirmation={confirmationMessage}
          showConfirmation={formSubmitted && confirmationMessage}
        />
        <form onSubmit={(event) => this.submit(submitForm, event)} noValidate>
          <RenderFields
            fields={fields}
            formValues={formValues}
            hasSubmitted={formSubmitted}
            updateForm={(field) => this.updateForm(field)}
          />
          <FormButton
            text={button.text}
            isValid={this.state.isValid}
            showLoading={this.state.formSubmitting}
          />
        </form>
      </div>
    );
  }
}

const formQuery = gql`
    query gravityForm($formId:Int!)
    {
        form(formId: $formId) {
            isActive
            title
            description
            id
            button {
                text
            }
            fields {
                id
                label
                type
                defaultValue
                placeholder
                maxLength
                isRequired
                cssClass
                description
            }
            confirmations {
                isDefault
                type
                message
                url
            }
        }   
    }
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
`;

// todo: add reselect
const formatComponentName = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// todo: add reselect
// after we get the form data back from
// graphql, we need to dynamically fetch the
// Field component that we can get via then
// field's component and validation for the typre
const prepareForm = (form) => {
  const { fields = [], ...restOfForm } = form;
  const fullFields = fields.map(field => {
    const { type } = field;
    // formCode is the default object {component, validation} returned
    // by each Field component inside the /Fields folder
    // we need to extract validation here instead of just validating
    // inside of the component due to that would require either
    // the adition of redux (would be ok) so we can pass validation
    // as a param to the action OR for some stupid callback system
    // with a timer to callback to validate (validating can cause a state
    // update, which cannot happen inside of render)
    // therefor we extract validation at the container level so we may
    // instantly upon mounting, apply the valication logic
    const formCode = FormFields[formatComponentName(type)];
    // the following adds the component and validation to the field type
    const fullField = { ...field, component: formCode.component, formValidation: formCode.validation };
    return fullField;
  });
  // we have modified fields therefore we MUST NOT MUTATE and return a new fields array
  // via de-structuring the remaining params not updated
  const fullForm = { ...restOfForm, fields: fullFields};
  return fullForm;
};

export default graphql(formQuery, {
  options: (props) => ({
    variables: { formId: props.formId },
  }),
  props: ({ mutate, data: { loading, form = {} } }) => {
    return {
      loading,
      form: prepareForm(form),
      submitForm: (submittedFormInput) => mutate({
        variables: { submittedFormInput }
      })
    };
  }
})(GravityForm);
