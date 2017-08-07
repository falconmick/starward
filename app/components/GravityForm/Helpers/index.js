// given a form and it's field, apply the field validation upon the form value to create a new
// form value which includes form validation.
export const createFormValue = (formValue, field) => {
  const { formValidation } = field;
  const { id, value, serverValid = true } = formValue;
  return {
    id,
    value,
    formValid: formValidation(field, value),
    serverValid
  };
};

// todo: add reselect
// for now only running on construct as
// we don't have reselect to save our lives
export const extractFormValues = (fileds = [], formValues = []) => {
  // for each field we recieve to render
  const extractedFormValues = fileds.map(field => {
    // look through all of our current form values (state)
    const existingFormValue = formValues.find(formValue => formValue.id === field.id);

    // if this form value exists, this means that we need not create a new
    // value to store field state
    if (existingFormValue) {
      return existingFormValue;
    }

    // we have a new field, create form state
    return createFormValue({ id: field.id, value: field.defaultValue }, field);
  });

  return extractedFormValues;
};

export const createNewFormValues = (field, formValue, formValues) => {
  const { id } = field;
  const formField = formValues.filter(f => f.id !== id);
  // given the new formValues, run field validation and return a new
  // formValues array based upon the prior to probably update form state
  const newFormFields = [...formField, createFormValue(formValue, field)];
  return newFormFields;
};