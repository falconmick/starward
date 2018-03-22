import { postTypeFactory } from '../../apollo/factory/postType';
import { apolloModule } from '../../apollo/utils/apolloModule';
import { joinQueryDefinitionString } from '../../apollo/utils/helpers';
import { taxonomyFactory } from '../../apollo/factory/taxonomy';

// first we make the taxonomy as post types can inherit taxonomies and display them
const { bundle: genreBundle, rootQuery: genreRootQuery, addToPostTypeArgs: addGenresArgs } = taxonomyFactory({typeName: 'Genre', apiEndpoint: 'genre'});

// create the post type and pass the taxonomies it has in
const { bundle: bookBundle, rootQuery: bookRootQuery } = postTypeFactory({typeName: 'Book', apiEndpoint: 'books-api', taxonomies: [addGenresArgs]});

const rootQuery = joinQueryDefinitionString([genreRootQuery, bookRootQuery]);

export const examplePostTypeModule = apolloModule(bookBundle, genreBundle)({rootQuery});

// bellow is a test query that calls all root queries for taxonomies and post types + verifies that post and categories still
// work since I made their code re-usable!

/*
query books {
  books {
    pageData {
      title
      genres {
        name
        id
      }
    }
  }
  book(slug:"book-5") {
    title
    genres {
      name
    }
  }
  genres(listOfIds:[11]) {
    name
    id
  }
  noArgs: genres {
    name
    id
  }
  posts {
    pageData {
      title
      slug
      categories {
        name
        id
      }
    }
  }
  post(slug:"utc-test") {
    title
  }
  categories {
    id
    name
  }
  catQuery: categories(listOfIds:[1]) {
    id
    name
  }
}
 */