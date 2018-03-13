import { getForm } from '../../../Form/formQueries';

export const resolvers = {
  FormSection: {
    form: ({formId}) => {
      return getForm({}, {formId});
    },
  }
};
