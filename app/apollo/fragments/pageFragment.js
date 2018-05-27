import gql from 'graphql-tag';
import { formFragment } from './formFragment';

export const pageFragment = {
  page: gql`
      fragment defaultPage on Page {
          title
          acf {
              layout {
                  autoFields
                  queryable {
                      __typename
                      ... on FormSection {
                          form {
                              ...defaultForm
                          }
                          showDescription
                          showTitle
                      }
                      ... on EmptyType {
                          isEmptyType
                      }
                  }
              }
          }
          yoast {
              focuskw
              title
              metadesc
              linkdex
              metakeywords
              canonical
              redirect
          }
      }
      ${formFragment.form}
  `,
};
