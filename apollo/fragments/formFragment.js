import { gql } from 'react-apollo';

export const formFragment = {
  form: gql`
      fragment defaultForm on Form {
          isActive
          title
          description
          id
          button {
              text
          }
          fields {
              id
              label
              type
              defaultValue
              placeholder
              maxLength
              isRequired
              cssClass
              description
              enablePasswordInput
              choices {
                  text
                  value
                  isSelected
              }
          }
          confirmations {
              isDefault
              type
              message
              url
          }
      }
  `,
};
