import { postTypeFactory } from '../../apollo/factory/postType';
import { apolloModule } from '../../apollo/utils/apolloModule';
import { joinQueryDefinitionString } from '../../apollo/utils/helpers';
import { taxonomyFactory } from '../../apollo/factory/taxonomy';

const { bundle: genreBundle, rootQuery: genreRootQuery, addToPostTypeArgs: addGenresArgs } = taxonomyFactory({typeName: 'Genre', apiEndpoint: 'genre'});
// note how we are not passing the Genre type into book.
// if these were to somhowe resolve out of order, this would cause a break!
// usually we export type /w the types also it returns, i.e.:
// const type = () => [BookType, GenreType];
// if we get problems here we can turn the factories into curries that figure out
// the type, then we will return an object that contains the current state of creating the
// Post type, just before we define the type = () => [] thing, so that we can pass more type strings in.
// however this still might not work. that's why I didn't bother
// perhapse taxonomyFactory could instead return it's Type
const { bundle: bookBundle, rootQuery: bookRootQuery } = postTypeFactory({typeName: 'Book', apiEndpoint: 'books-api', taxonomies: [addGenresArgs]});

const rootQuery = joinQueryDefinitionString([genreRootQuery, bookRootQuery]);

export const examplePostTypeModule = apolloModule(bookBundle, genreBundle)({rootQuery});
