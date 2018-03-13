import gql from 'graphql-tag';

// make sure to include id from fields as it's required for form submtion currently
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
