import { gql } from 'react-apollo';
import { formFragment } from '../../apollo/fragments/formFragment';

export const formQuery = gql`
    query gravityForm($formId:Int!)
    {
        form(formId: $formId) {
            ...defaultForm
        }
    }
    ${formFragment.form}
`;