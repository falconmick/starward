import { postTypeFactory } from '../../apollo/utils/postType';
import { apolloModule } from '../../apollo/utils/apolloModule';

const { bundle: bookBundle, rootQuery: bookRootQuery } = postTypeFactory({typeName: 'Book', apiEndpoint: 'books-api'});

export const examplePostTypeModule = apolloModule(bookBundle)({rootQuery: bookRootQuery});
