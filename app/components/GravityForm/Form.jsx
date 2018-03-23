import React, { PureComponent } from 'react';
import gql from 'graphql-tag';
import {
  graphql,
  compose
} from 'react-apollo';
import { FormError } from './FormError';
import { FormConfirmation } from './FormConfirmation';
import { FormButton } from './Button';
import { RenderFields } from './RenderFields';
import * as FormFields from './Fields';
import { createNewFormValues, extractFormValues, updateFormValuesFromServer } from './Helpers';
import { formFragment } from '../../apollo/fragments/formFragment';

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

  componentWillReceiveProps(nextProps) {
    const { form = {} } = nextProps;
    const { fields = [] } = form;
    this.setState({formValues: extractFormValues(fields, [])});
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
    const isValid = newFormFields.filter(field => !field.formValid).length === 0;
    this.setState({formValues: newFormFields, isValid});
  }

  /*
      id: ID!
    fields: [SubmitField!]
    isValid: Boolean!
    validation: [FormValidation!]
   */
  submit(submitForm, event) {
    const { isValid } = this.state;
    event.preventDefault();
    if (!isValid) {
      return;
    }
    this.setState({formSubmitting: true, formSubmitted: false});
    const submitValues = this.state.formValues.map(formValue => {
      const { id, value } = formValue;
      return { id, value };
    });
    submitForm({fields: JSON.stringify(submitValues), id: this.props.formId})
      .then(({data}) => {
        const { submitForm: result = {} } = data;
        const { fields: stringFields, validation } = result;
        const fields = JSON.parse(stringFields);
        const updatedValues = fields.map(field => {
          const validationError = validation.find(validationItem => validationItem.fieldId === field.id);
          if (validationError) {
            // validationError.message has a validation message! But we don't show validation errors :(
            return { ...field, serverValid: false };
          }
          return { ...field, serverValid: true };
        });
        const formValues = updateFormValuesFromServer(this.state.formValues, updatedValues);
        this.setState({formSubmitting: false, submitFailed: false, formSubmitted: true, formValues, isValid});
      })
      .catch((err) => {
        this.setState({formSubmitting: false, submitFailed: true, formSubmitted: true});
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

const formMutation = gql`  
    mutation SubmitFormMutation($form:SubmittedFormInput!) {
        submitForm(form:$form) {
            id
            fields 
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

const formQuery = gql`
    query gravityForm($formId:Int!)
    {
        form(formId: $formId) {
            ...defaultForm
        }
    }
    ${formFragment.form}
`;

export default compose(
  graphql(formQuery, {
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
  }),
  graphql(formMutation, {
    props: ({ mutate }) => {
      return {
        submitForm: (submittedFormInput) => mutate({
          variables: { form: submittedFormInput }
        })
      };
    }
  })
)(GravityForm);
