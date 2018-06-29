export const createType = ({typeName, acfTypeName, archiveQueryName, singleQueryName}) => {
  const acfType = acfTypeName || 'Acf'; // if the acf that is given to a page !== whats given to this post
  //                                    (the flexible content layout) we can use the correct type here
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
      tags: [Tag]!
      better_featured_image: BetterFeaturedImage
      yoast: Yoast!
      acf: ${acfType}!
  }
  
  extend type RootQuery {
    ${singleQueryName}(slug: String!): ${typeName}
    ${archiveQueryName}(query: String, page: Int, perPage: Int): ${typeName}Pager
  }
`;
};
