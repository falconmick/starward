import { dashCaseToCamelCase } from '../utils/queryTools';

export const camelCaseYoastObject = (yoast) => {
  const graphQlYoast = Object.keys(yoast)
    .reduce((accumulator, key) => {
      const safeKey = dashCaseToCamelCase(key);
      // creating a new object each time probably isnt smart
      // return {[safeKey]: page.yoast[key], ...accumulator};
      // eslint-disable-next-line no-param-reassign
      accumulator[safeKey] = yoast[key];
      return accumulator;
    }, {});
  return graphQlYoast;
};
