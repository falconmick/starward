import React from 'react';
import { emailValdation } from '../Helpers/validation';
import { Field } from './Field';
import { FormField } from './FormField';

// form validation MUST follow the signature of
// field (from graphql), value (current state)
// as this function is used by the container component
// in a generic way for all fields. Signature:
// (field, value) => boolean
const fieldValidation = (field, value) => {
  const { isRequired } = field;
  const fieldIsValid = emailValdation(isRequired, value);
  return fieldIsValid;
};

// may be very simple, but more complicated
// fields could have more complex requriements
// so this is here as an example of how to do so.
const updateField = (id, value) => {
  return {
    value,
    id
  };
};

// extract the input and create a payload to send
// to the updateForm callback
const onInputChange = (id, event) => {
  const value = event.target ? event.target.value : null;
  return updateField(id, value);
};

const EmailField = (props) => {
  const { field, fieldState, isValid, updateForm } = props;
  const { value } = fieldState;
  const { id, type, label, cssClass, placeholder, isRequired, maxLength } = field;
  return (
    <FormField cssClass={cssClass} isValid={isValid} fieldType="email">
      <Field htmlFor={id} label={label} isRequired={isRequired}>
        <input
          name={id}
          type={type}
          value={!value ? '' : value}
          placeholder={placeholder}
          maxLength={maxLength}
          required={isRequired}
          onChange={(event) => updateForm(onInputChange(id, event))}
        />
      </Field>
    </FormField>
  );
};

// all Fields now return a component to render and validation
// to ensure that upon load we are able to correctly calculate
// form state (which relies on validation that must be ran before
// we construct the DOM, which means that we cannot wait for the
// Component to be mounted before we have access to it's validation
// methods.. The other benifit of extracting validation is the consuming
// component can choose to ignore validation if it pleases.
export default {
  component: EmailField,
  validation: fieldValidation
};
