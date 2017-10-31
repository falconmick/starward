import { createCustomPage } from './Page';
import { formQuery } from '../queries/formQuery';

// On pages with single forms, we want to pre-load the data
// into the cache.
// imrpovments: Add forms query, with list of forms to pre-download

const extractVariables = props => ({
  formId: props.route.formId,
});

export const FormPage = createCustomPage({gqlQueries: [
  {
    query: formQuery, getVariables: extractVariables
  }
]});
