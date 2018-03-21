import { apolloBundle } from '../apolloBundle';
import { authorResolvers, basePostTypeResolvers, excerptResolvers, featuredMediaResolvers } from '../postTypeResolver';
import { getPost, getPosts } from '../../types/Post/postQueries';
import { getCategories } from '../../types/Category/categoryQueries';
import { getTags } from '../../types/Tag/tagQueries';
import { createPagableType } from '../pager';

const createPostTypeType = ({typeName}) => {
  return `
  type ${typeName} implements PostType {
      id: ID!
      # in UTC time
      created: Date!
      # in UTC time
      modified: Date!
      guid: String!
      slug: String!
      status: String!
      type: String!
      link: String!
      title: String!
      content: String!
      excerpt: String!
      author: User!
      featured_media: Media
      comment_status: String!
      ping_status: String!
      sticky: Boolean!
      template: String!
      format: String!
      meta: [String]!
      categories: [Category]!
      tags: [Tag]!
      better_featured_image: BetterFeaturedImage
      yoast: Yoast!
      acf: Acf!
  }
`
};
// todo: make root query create post, posts via config value or default to typename cammel case
const createPostTypeResolver = ({typeName}) => {
  return {
    RootQuery: {
      post: getPost,
      posts: getPosts
    },
    [typeName]: {
      categories: ({categories}) => {
        return getCategories(null, {listOfIds: categories});
      },
      tags: ({tags}) => {
        return getTags(null, {listOfIds: tags});
      },
      ...authorResolvers,
      ...featuredMediaResolvers,
      ...excerptResolvers,
      ...basePostTypeResolvers
    },
  };
}

export const createPostType = ({typeName}) => {
  if (!typeName) {
    console.error('typeName is a required argument of createPostTypeType');
  }

  const postTypeString = createPostTypeType({typeName});
  const paginatedTypeString = createPagableType(typeName);
  const type = () => [postTypeString, paginatedTypeString];

  const resolvers = createPostTypeResolver({typeName});

  const bundle = apolloBundle({type, resolvers});
  const rootQuery = '';

  return {
    bundle,
    rootQuery,
  };
};
