import { getForm } from '../../../../../apollo/types/Form/formQueries';

export const resolvers = {
  FormSection: {
    form: ({formId}) => {
      return getForm({}, {formId});
    },
  }
};
