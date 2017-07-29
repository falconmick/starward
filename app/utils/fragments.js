import { gql } from 'react-apollo';

export const post = {
  fragments: {
    archives: gql`
        fragment archivePost on PostPager {
            page
            totalItems
            totalPages
            pageData {
                slug
                title
                excerpt
            }
        }
    `
  }
};
