export const joinQueryDefinitionString = (queryStringArray) =>
  queryStringArray.filter(nonFalsyString => nonFalsyString).join('\n'); // remove empty strings then put newlines to seperate
