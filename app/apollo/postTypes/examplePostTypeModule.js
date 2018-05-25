import { postTypeFactory } from '../../../apollo/factory/postType/index';
import { apolloModule } from '../../../apollo/utils/apolloModule';
import { taxonomyFactory } from '../../../apollo/factory/taxonomy/index';

// the taxonomy returns a bundle and a tool to add itself to as many post types as you wish!
// this is because typically you will have 1 post type with 1-many taxonomies
const { bundle: genreBundle, taxonomyExtender: genreExtender } = taxonomyFactory({typeName: 'Genre', apiEndpoint: 'genre'});

const bookTypeName = 'Book';
// we return getPosts as genreExtender will need it to query books related to a taxonomy as the book API
// holds that ability to search
const { bundle: bookBundle, getPosts } = postTypeFactory({typeName: bookTypeName, apiEndpoint: 'books-api'});

// sets up the genreExtender to extend Book, then adds both single and archive taxonomy access.
// if the field names that the API returns are different from the fields that genre added to
// root query, then we would pass the correct single/archive field names to .archive();
const extendedBookBundle = genreExtender({typeName: bookTypeName, archiveQueryName: 'books', getPosts}).twoWayBindPostTypeToTaxonomy();

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
        books(page:1,perPage:2) {
          pageData{
            title
          }
        }
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