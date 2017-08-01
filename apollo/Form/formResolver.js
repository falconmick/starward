import { getForm } from './formQueries';

export const resolvers = {
  RootQuery: {
    form: getForm,
  }
};
