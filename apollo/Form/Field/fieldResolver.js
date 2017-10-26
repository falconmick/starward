export const resolvers = {
  Field: {
    choices: ({choices}) => {
      return choices === '' ? [] : choices;
    },
  }
};
