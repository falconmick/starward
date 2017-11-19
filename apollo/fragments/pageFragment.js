import gql from 'graphql-tag';

export const pageFragment = {
  page: gql`
      fragment defaultPage on Page {
          title
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
