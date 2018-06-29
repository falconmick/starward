# Adding Post Types

This is super duper simple, just checkout app/apollo/postTypes/examplePostTypeModule.

This file does make your module via the following calls:

1. **taxonomyFactory** - pass in the type name and the api endpoint that your WP exposes it on and
it will return you an object with your bundle (used to create the overall module) plus a taxonomyExtender
which can be used later *see bellow*
2. **postTypeFactory** - same as taxonomy, but instead it makes a post type bundle and also the
getPosts function which you can use to resolve posts from within your taxonomy, this is required if you use the taxonomyExtender


you will then notice that you can optionally use the taxonomyExtender returned by your taxonomy to
add the ability to query your posts from your taxonomy! WOW! also you can then call twoWayBindPostTypeToTaxonomy after
to also add the ability to call the taxonomy from the Post.. AWWEEESOME!

It's pretty simple really!

### Improvements
one thing I really don't like about the factories at the moment is that you get ALL of the fields that a post/taxonomy
could possibly have. However when you setup your taxonomy/post you might not include some of these features and thus
these fields will always return null :( Perhapse a better solution would be to create a function that given a Post type
or Taxonomy name extend that usign the extends keyword that GraphQL provides and then supply a resolver, then we add the
bundle this function returns with our overall module.