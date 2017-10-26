import React from 'react';
import { selectValidation } from '../Helpers/validation';
import { Field } from './Field';
import { FormField } from './FormField';

// form validation MUST follow the signature of
// field (from graphql), value (current state)
// as this function is used by the container component
// in a generic way for all fields. Signature:
// (field, value) => boolean
const fieldValidation = (field, value) => {
  const { isRequired } = field;
  const fieldIsValid = selectValidation(isRequired, value);
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

const SelectField = (props) => {
  const { field, fieldState, isValid, updateForm } = props;
  const { value } = fieldState;
  const { id, label, cssClass, isRequired, choices, placeholder } = field;
  return (
    <FormField cssClass={cssClass} isValid={isValid} fieldType="select">
      <Field htmlFor={id} label={label} isRequired={isRequired}>
        <select
          name={id}
          required={isRequired}
          value={value}
          onChange={(event) => updateForm(onInputChange(id, event))}
        >
          {placeholder ? <option disabled>{placeholder}</option> : null}
          {choices.map((choice, index) => {
            const { value: choiceValue, text } = choice;
            return (
              <option key={index} value={choiceValue}>
                {text}
              </option>
            );
          })}
        </select>
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
  component: SelectField,
  validation: fieldValidation
};
