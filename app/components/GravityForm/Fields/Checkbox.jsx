import React from 'react';
import { checkboxValidation } from '../Helpers/validation';
import { Field } from './Field';
import { FormField } from './FormField';

// form validation MUST follow the signature of
// field (from graphql), value (current state)
// as this function is used by the container component
// in a generic way for all fields. Signature:
// (field, value) => boolean
const fieldValidation = (field, value) => {
  const { isRequired } = field;
  const fieldIsValid = checkboxValidation(isRequired, value);
  return fieldIsValid;
};

// may be very simple, but more complicated
// fields could have more complex requriements
// so this is here as an example of how to do so.
const updateField = (id, selectedValues) => {
  return {
    value: selectedValues,
    id
  };
};

// extract the input and create a payload to send
// to the updateForm callback
const onInputChange = selectedValues => (id, event) => {
  const value = event.target ? event.target.value : null;
  const checked = event.target ? event.target.checked : null;

  let updatedValues = null;
  if (value) {
    const rawValues = selectedValues.map(val => val.value);
    const valueIndex = rawValues.indexOf(value);
    // if the value is already in the values, remove it
    if (valueIndex !== -1) {
      rawValues.splice(valueIndex, 1);
    }
    if (checked) {
      rawValues.push(value);
    }

    updatedValues = rawValues.map(val => ({ value: val }));
  }
  return updateField(id, updatedValues || selectedValues);
};

const CheckboxField = (props) => {
  const { field, fieldState, isValid, updateForm } = props;
  const { value } = fieldState;
  const { id, label, cssClass, isRequired, choices } = field;
  const rawValues = value.map(val => val.value);
  return (
    <FormField cssClass={cssClass} isValid={isValid} fieldType="checkbox">
      <Field htmlFor={id} label={label} isRequired={isRequired}>
        {choices.map((choice, index) => {
          const { value: choiceValue, text } = choice;
          return (
            <label key={index}>
              <input
                type="checkbox"
                name={id}
                value={choiceValue}
                checked={rawValues.includes(choiceValue)}
                onChange={(event) => updateForm(onInputChange(value)(id, event))}
              />
              {text}
            </label>
          );
        })}

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
  component: CheckboxField,
  validation: fieldValidation
};
