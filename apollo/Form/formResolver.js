/* eslint-disable camelcase */
import { getForm } from './formQueries';

export const resolvers = {
  RootQuery: {
    form: getForm,
  },
  Form: {
    isActive: ({is_active}) => {
      return is_active === 1;
    },
    dateCreated: ({date_created}) => {
      return date_created === 1;
    },
    isTrash: ({is_trash}) => {
      return is_trash === 1;
    },
  }
};
