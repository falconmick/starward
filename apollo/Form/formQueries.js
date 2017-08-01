import axios from 'axios';
import { calculateSignature, calcurateUnixExpiry } from '../utils/gravityForms';
import { GRAVITY_PUBLIC } from '../../server/config/app';
import { WP_URL } from '../../app/config/app';

export const getForm = (obj, args) => {
  const { formId } = args;

  const route = `forms/${formId}`;
  const unixExpiry = calcurateUnixExpiry(new Date());
  const signature = calculateSignature(unixExpiry, 'GET', route);

  const url = `${WP_URL}/gravityformsapi/${route}?api_key=${GRAVITY_PUBLIC}&signature=${signature}&expires=${unixExpiry}`;

  return new Promise((resolve, reject) => {
    return axios.get(url)
      .then(res => {
        const data = res.data;
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};