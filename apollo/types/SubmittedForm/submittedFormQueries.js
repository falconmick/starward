import axios from 'axios';
import { calculateSignature, calcurateUnixExpiry } from '../../utils/gravityForms';
import { GRAVITY_PUBLIC } from '../../../server/config/app';
import { WP_URL } from '../../../app/config/app';

const filterNull = (item) => {
  return item !== null;
}

const formBody = (field) => {
  if (Array.isArray(field.value)) {
    return field.value.map((subFields, index) => {
      return { key: `input_${field.id}_${subFields.id || (index + 1)}`, value: subFields.value };
    });
  }
  return [{ key: `input_${field.id}`, value: field.value }];
};

const updateForm = (form, isValid, validation = []) => {
  return { ...form, isValid, validation };
};

const updateValidForm = (form) => {
  return updateForm(form, true);
};

const updateInvalidForm = (form, validation = {}) => {
  const validationAsArray = Object.keys(validation).map(validationFieldId => {
    return { fieldId: validationFieldId, message: validation[validationFieldId]};
  });
  return updateForm(form, false, validationAsArray);
}

export const submitForm = (obj, args) => {
  const { form } = args;
  const { id, fields: fieldsString } = form;
  const fields = JSON.parse(fieldsString);

  const route = `forms/${id}/submissions`;
  const unixExpiry = calcurateUnixExpiry(new Date());
  const signature = calculateSignature(unixExpiry, 'GET', route);

  const url = `${WP_URL}/gravityformsapi/${route}?api_key=${GRAVITY_PUBLIC}&signature=${signature}&expires=${unixExpiry}`;
  const gravityFields = fields
    .filter(filterNull)
    .reduce((acc, field) => {
      const fieldAsBodyArray = formBody(field);

      fieldAsBodyArray.forEach(fieldAsBody => {
        // eslint-disable-next-line no-param-reassign
        acc[fieldAsBody.key] = fieldAsBody.value;
      });
      return acc;
    }, {});

  const body = {
    input_values: gravityFields
  };

  return new Promise((resolve, reject) => {
    return axios.post(url, body)
      .then(res => {
        const { data } = res;
        const { response, status = 200 } = data;

        if (status !== 200) {
          reject(`Could not submit form with id: ${id} err msg: 2`);
        }

        const { is_valid: isValid, validation_messages: validationMessages } = response;
        if (isValid) {
          const newForm = updateValidForm(form);
          resolve(newForm);
        } else {
          const newForm = updateInvalidForm(form, validationMessages)
          resolve(newForm);
        }
      })
      .catch(error => {
        reject(`Could not submit form with id: ${id} err msg: 1`);
      });
  });
};
/*
    id: ID!
    fields: [SubmitField!]
    isValid: Boolean
    validation: [FormValidation!]
 */
/*
  fieldId: ID!
  message: String
 */