import { createPostType } from '../../apollo/utils/postType';
import { apolloModule } from '../../apollo/utils/apolloModule';

const { bundle: bookBundle, rootQuery: bookRootQuery } = createPostType();

export const examplePostTypeModule = apolloModule(bookBundle)({rootQuery: bookRootQuery});
