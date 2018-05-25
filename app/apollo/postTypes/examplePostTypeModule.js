import { postTypeFactory } from '../../../apollo/factory/postType/index';
import { apolloModule } from '../../../apollo/utils/apolloModule';
import { taxonomyFactory } from '../../../apollo/factory/taxonomy/index';

// first we make the taxonomy as post types can inherit taxonomies and display them
const { bundle: genreBundle, taxonomyExtender: genreExtender } = taxonomyFactory({typeName: 'Genre', apiEndpoint: 'genre'});

const bookTypeName = 'Book';
const bookBundle = postTypeFactory({typeName: bookTypeName, apiEndpoint: 'books-api'});

// sets up the genreExtender to extend Book, then adds both single and archive taxonomy access.
// if the field names that the API returns are different from the fields that genre added to
// root query, then we would pass the correct single/archive field names to .archive();
const extendedBookBundle = genreExtender({typeName: bookTypeName}).archive();

export const examplePostTypeModule = apolloModule(bookBundle, genreBundle, extendedBookBundle);

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
      acf {
        layout {
          autoFields
        }
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