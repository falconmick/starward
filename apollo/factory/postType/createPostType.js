const mapTaxonomyIntoTypeField = taxomony => {
  const { archiveTaxonomyQueryName, taxonomyTypeName } = taxomony;

  return `${archiveTaxonomyQueryName}: [${taxonomyTypeName}!]\n`;
};

export const createType = ({typeName, taxonomies}) => {

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
      ${taxonomies.map(mapTaxonomyIntoTypeField)}
  }
`;
};
