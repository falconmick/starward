import React from 'react';

const mapFieldCurry = (formValues, updateForm, hasSubmitted) => (field) => {
  // extract the component we will use to render our field
  const { component: FormComponent } = field;
  // find our state for this filed
  const fieldState = formValues.find(formValue => formValue.id === field.id);
  const { formValid, serverValid } = fieldState;
  // after the form has been submited, we start showing validation messages
  const isValid = !hasSubmitted || (formValid && serverValid);
  return (
    <FormComponent
      key={field.id}
      field={field}
      fieldState={fieldState}
      updateForm={props => updateForm(props)}
      isValid={isValid}
    />
  );
}

export const RenderFields = props => {
  const { fields, formValues, updateForm, hasSubmitted } = props;
  // each field shares similar requirements, so we curry those props
  // so we don't waist memory storing them!
  // the value returned accepts the field part of the map to create
  // an array of FormComponents to render
  const mapField = mapFieldCurry(formValues, updateForm, hasSubmitted);
  return (
    <div className="fields">
      {fields.map(mapField)}
    </div>
  );
};
