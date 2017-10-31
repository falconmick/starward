import { gql } from 'react-apollo';

export const pageFragment = {
  page: gql`
      fragment defaultPage on Page {
          acf {
              layout
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
  `,
};
