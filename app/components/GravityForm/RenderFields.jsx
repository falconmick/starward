import React from 'react';
import * as FormFields from './Fields';

const formatComponentName = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const mapFieldCurry = (formValues, updateForm) => (field) => {
  const FormComponent = FormFields[formatComponentName(field.type)];
  const { value } = formValues.find(formValue => formValue.id === field.id);
  // const isValid = formValues[field.id] ? formValues[field.id].valid : false;
  return (
    <FormComponent
      key={field.id}
      field={field}
      value={value}
      updateForm={props => updateForm(props)}
      // isValid={isValid}
      // submitFailed={submitFailed}
      // submitSuccess={submitSuccess}
    />
  );
}

export const RenderFields = props => {
  const { fields, formValues, updateForm } = props; // , formValues, updateForm, submitFailed, submitSuccess
  const mapField = mapFieldCurry(formValues, updateForm);
  return (
    <div className="fields">
      {fields.map(mapField)}
    </div>
  );
};
