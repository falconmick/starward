import { gql } from 'react-apollo';
import { yoastFragment } from './yoastFragment';

export const postFragment = {
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
  `,
  post: gql`
      fragment singlePost on Post {
          title
          date
          author {
              slug
              name
          }
          featuredImage: featured_media {
              url
              alt: alt_text
          }
          content
          categories {
              slug
              name
          }
          seo: yoast {
              ...headYoast
          }
      }

      ${yoastFragment.archives}
  `
};