import { taxonomyFactory } from '../../factory/taxonomy';
import { postTypeFactory } from '../../factory/postType';
import { apolloModule } from '../../utils/apolloModule';

// given that creating post types is common the code to create a post type is setup to be re-usable,
// which is why this Type isn't like the others

// setup the category taxonomy
const { bundle: categoryBundle, taxonomyExtender: postExtender } = taxonomyFactory({
  typeName: 'Category',
  apiEndpoint: 'categories'
});

// setup the Post post type
const bookTypeName = 'Post';
const { bundle: postBundle, getPosts } = postTypeFactory({typeName: bookTypeName, apiEndpoint: 'posts'});

const extendedPostBundle = postExtender({typeName: bookTypeName, archiveQueryName: 'posts', getPosts}).twoWayBindPostTypeToTaxonomy();

export const postBundles = [postBundle, categoryBundle, extendedPostBundle];