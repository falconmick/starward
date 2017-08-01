import { gql } from 'react-apollo';

export const yoast = {
  fragments: {
    archives: gql`
        fragment headYoast on Yoast {
            canonical
            title
            metadesc
            metaRobotsNofollow
            metaRobotsNoindex
            opengraphDescription
            opengraphImage
            opengraphTitle
        }
    `
  }
};

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
    `,
    post: gql`
      fragment singlePost on Post {
          title
          date
          author
          featuredImage:featured_media
          content
          categories
          seo:yoast
      }
      
      ${yoast.fragments.archives}
    `
  }
};
