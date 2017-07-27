import { dashCaseToCamelCase } from './queryTools';

export const resolveDashCase = (dashCaseObject) => {
  const camelCaseObject = Object.keys(dashCaseObject)
    .reduce((accumulator, key) => {
      const safeKey = dashCaseToCamelCase(key);
      // creating a new object each time probably isnt smart
      // return {[safeKey]: page.yoast[key], ...accumulator};
      // eslint-disable-next-line no-param-reassign
      accumulator[safeKey] = dashCaseObject[key];
      return accumulator;
    }, {});
  return camelCaseObject;
};
