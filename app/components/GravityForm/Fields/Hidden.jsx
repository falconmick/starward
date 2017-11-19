import React from 'react';

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

const HiddenField = props => {
  const { field, fieldState, updateForm } = props;
  const { value } = fieldState;
  const { id, type } = field;
  return (
    <input
      name={id}
      type={type}
      value={!value ? '' : value}
      onChange={(event) => updateForm(onInputChange(id, event))}
    />
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
  component: HiddenField,
  validation: () => true,
};
