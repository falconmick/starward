import { getForm } from '../../../../../apollo/types/Form/formQueries';

// NOTE: Cannot import this inside of web app or redis will be included, which obviously doesn't work on client side!!
export const resolvers = {
  FormSection: {
    form: ({formId}) => {
      return getForm({}, {formId});
    },
  }
};
