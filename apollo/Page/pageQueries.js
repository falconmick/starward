import axios from 'axios';
import { WP_API } from '../../config/app';
import { dashCaseToCamelCase } from '../utils/quertyTools';

/* ----------- WP REST API v2 endpoints ----------- */
const wpPagesURL = `${WP_API}/wp/v2/pages`;

export default (obj, args) => {
  const { slug } = args;
  return new Promise((resolve, reject) => {
    const wpPageURL = `${wpPagesURL}?slug=${slug}`;
    return axios.get(wpPageURL)
      .then(res => {
        const page = res.data[0];
        resolve(page);
      })
      .catch(error => {
        reject(error);
      });
  });
};



const result1 = dashCaseToCamelCase('fantastic'); // expect 'fantastic'
const result2 = dashCaseToCamelCase('fant-astic'); // expect 'fantAstic'
const result3 = dashCaseToCamelCase('-fantastic'); // expect 'fantastic'
const result4 = dashCaseToCamelCase('--fantastic'); // expect 'fantastic'
const result5 = dashCaseToCamelCase('fantastic-'); // expect 'fantastic'
const result6 = dashCaseToCamelCase('fantastic--'); // expect 'fantastic'
const result7 = dashCaseToCamelCase('fant--astic'); // expect 'fantAstic'
const result8 = dashCaseToCamelCase('fant-a-stic'); // expect 'fantAstic'
const result9 = dashCaseToCamelCase(''); // expect ''
const result10 = dashCaseToCamelCase('-a'); // expect 'a'
const result11 = dashCaseToCamelCase('-'); // expect ''
const result12 = dashCaseToCamelCase('--'); // expect ''

console.log(result1);
console.log(result2);
console.log(result3);
console.log(result4);
console.log(result5);
console.log(result6);
console.log(result7);
console.log(result8);
console.log(result9);
console.log(result10);
console.log(result11);
console.log(result12);

