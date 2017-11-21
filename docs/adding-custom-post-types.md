# Adding Post Types

The process of adding a custom post type follows the same steps as extending-graphql.md

The differences are:

1. You need to create a custom post type inside of the WP project. You can find the example post type php file inside of postTypeExample/bookPostType.php. 
Note to keep an eye on: 
    * rest_base: determines the wp endpoint you pass into the wpProxy inside of the query.
    * supports: this is where you define all of the features you want your posttype to have like 
    'title', 'editor', 'excerpt', 'author', 'thumbnail', 'comments', 'trackbacks', 'revisions', 'custom-fields', 'page-attributes', 'post-formats'
    
2. Type definition (index.js). As the supports for a posttype is configurable, you need to add/remove fields. You will 
need to manually call the API endpoint to figure out what values are returned to add to your Type. See Post's Type as allot 
of the common options, like Titles and Excerpts are enabled by default and being used.
3. Resolvers: As par the Type def, some of the supports return data that isn't shaped too nicely. See Posts for example, 
where I am using the following pre-defind resolvers that you can add to your post type! Note: all Post Types must use basePostTypeResolvers. See example provided 
    * ...authorResolvers,
    * ...featuredMediaResolvers,
    * ...excerptResolvers,
4. Taxonomies, See the example, it's pretty strait forward.

Once you have completed the normal setups plus these added steps based on the example you should be able to access your 
custom post type!!

### Potential Improvements.

We need to make a new Type for each post type as post types can have different supports, however the Query file is 
going to be 100% the same each time, so perhapse we should wrap this into a factory/curry function that lets us 
pass in the api endpoint and do the rest without the copy pasta. Feel free anyone!