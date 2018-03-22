import { postTypeFactory } from '../../apollo/factory/postType';
import { apolloModule } from '../../apollo/utils/apolloModule';
import { joinQueryDefinitionString } from '../../apollo/utils/helpers';
import { taxonomyFactory } from '../../apollo/factory/taxonomy';

// first we make the taxonomy as post types can inherit taxonomies and display them
const { bundle: genreBundle, rootQuery: genreRootQuery, addToPostTypeArgs: addGenresArgs } = taxonomyFactory({typeName: 'Genre', apiEndpoint: 'genre'});

// create the post type and pass the taxonomies it has in
// note: you can create a custom ACF flexible content by copying apollo/types/acf
// from there pass in it's Type and Type name via the acf named argument of postTypeFactory
// it's on my todo: list to make an ACF factory. From there it would return a bundle and a addAcfArgs like taxonomyFactory
// after copying the Acf folder mentioned above, you would mofidy FlexibleContent/index.js to return a different queryable
// as this lets us define new prefetch cache resolvers (i.e. FormSection)
//
// NOTE: you don't have to send down a custom ACF if your not using the default page layout, you just wont be able
// to define the prefetch cache resolvers mentioned above. So if all of your data exists in the Fields you send down
// and you dont need to do a second API request based on what the user placed into the field then don't bother making a
// custom acf type. If in doubt message michael@birdbrain.com.au
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