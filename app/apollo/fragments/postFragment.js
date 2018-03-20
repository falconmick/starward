import gql from 'graphql-tag';
import { yoastFragment } from './yoastFragment';

export const postFragment = {
  archives: gql`
      fragment archivePost on PostPager {
          id
          page
          totalItems
          totalPages
          pageData {
              id
              slug
              title
              excerpt
          }
      }
  `,
  post: gql`
      fragment singlePost on Post {
          title
          modified
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
