# Apollo GraphQL

This project uses Apollo GraphQL as its primary form of data transport between the server and your front end app. It is comprised of the following queries:

- settings: Settings
- page(splat: String): Page
- pages(query: String, page: Int, perPage: Int): PagePager
- menuItem(slug: String): [MenuItem]
- categories(listOfIds:[Int!]): [Category]
- category(id: Int!): Category
- post(slug: String!): Post
- posts(query: String, page: Int, perPage: Int): PostPager
- users: [User]
- user(id: Int!): User
- media(id: Int!): Media
- tag(id: Int!): Tag
- tags(listOfIds:[Int!]): [Tag!]
- form(formId: Int!): Form

These queries that are provided by default map directly to the Wordpress API endpoints as such you can use then to get the data that you would normally expend to get from the API.
You can find these queries located inside of apollo/types/index.js.

## Types, Queries, Mutations, Resolvers

the types, queries, mutations and resolvers all reside within feature folders inside of the directory apollo/types (i.e. apollo/types/Page). 
The type definitions are located inside of apollo/type/{TypeName}/index.js. The Queries and Mutations are located inside 
apollo/type/{TypeName}/{typeName}Resolvers.js and the code that is ran to feed these queries/mutations are located within
apollo/type/{TypeName}/{typeName}Queries.js. The implementations of the queries are separated into different files as so that
we may reference the queries from within multiple Resolvers which comes in handy when your want to join API calls, see bellow.

Joining API Calls and shaping/cleaning data is achieved by adding fields to the Types resolver, an example of this can be
 seen inside of apollo/types/Post/postResolver.js where we are both joining api calls with categories (Post->categories) 
 as well as shaping data with excerptResolvers (converts a WpContent api data shape into a plain string!)
 
As you might have noticed, its only required that an index file is created (example apollo/types/Yoast) this is because 
sometimes an API call will return an object as a JSON field, so basically all your using this type for is a place for that
data to be palced and a way to query just what you need!

the apollo/type/{TypeName}/{TypeName}Resolver.js file has the following main fields on the object it returns, see for example an example Post resolver

    export const resolvers = {
      RootQuery: {
        post: getPost,
        posts: getPosts
      },
      Post: {
        categories: ({categories}) => {
          return getCategories(null, {listOfIds: categories});
        },
        excerpt: ({excerpt}) => {
          return excerpt.rendered;
        }
      },
    };

If you need to shape data from the WP API, you would the Post object for the above resolver, as you can see I was able
to make it so that when the user queries excerpt, they recieve excerpt.rendered as WP returns an Object for excerpt in 
the WP API call. Other common uses of this is to convert UTC time into ISO, see apollo/util/postTypeResolver.js


## How To Query!

I would recommend reading through the following documentation if you need to write/modify any queries and run into troubles: 
https://www.apollographql.com/docs/react/basics/queries.html 

Basically Apollo has replaced Redux as the way we access data, before you would write a connect function to grab data from 
the store, now you write a Query that fetches data and stores into a cache.

example query: Blog

    const pageQuery = gql`
        query BlogArchiveQuery($page:Int, $perPage:Int) {
            posts(page:$page, perPage:$perPage) {
                ...archivePost
            }
            categories {
                slug
                name
            }
            settings {
                name
            }
        }
        ${postFragment.archives}
    `;
    
    export default graphql(pageQuery, {
      options: (props) => ({
        variables: {
          page: props.params.page || 1,
          perPage: props.params.perPage || POSTS_PER_PAGE
        },
      }),
      props: ({ data: { loading, posts = {}, categories, settings } }) => {
        return {
          loading,
          categories,
          settings,
          blog: posts.pageData,
          pagination: {
            page: posts.page,
            totalPages: posts.totalPages,
            totalItems: posts.totalItems,
          }
        };
      }
    })(Blog);  

To break it down, we define a query using gql and template literals, queries can have
parameterised inputs as shown by $page: Int and then can run multiple queries, i.e. posts, categories and settings! 
each of the posts(params), categories and settings will be cached, however if you request only a name from settings and then 
more data the next time, it will need to fetch from the sever again... This is why we use fragments as show by the 
(...archivePost) to read more look at apollo's docs. By using fragments you ensure that the queries you write are highly 
cachable and don't result int multiple requests for almost exactly the same datal! However the flexibility 
of writing queries without fragments is not to be dismissed!

Next we use the graphql HOC provided by react-apollo to run the query we just defined. Optionally we can pas options into this as
the second paramater. Once again do read the docs, but basically it's here we pass the parameterised variables (we do this 
so that in the future if we use a plugin to compile queries, we will be able to reduce graphQL queries size over the wire, see 
docs if you wonna know how!). Also I am using props, I do this because I like to re-shape the data that 
my query returns, this is optional!! Finally just like redux's connect we pass the original Component in as the curried function's
second part!

However, just like in Redux land, all of your page data is retrieved via the Page.jsx component which does all the querying 
for you, unless you write types and queries for your ACF layout components (see bellow for more info on how this can improve
performance by pre-fetching things like forms in the page query!!)

#### How to build Queries?
whilest in dev goto: [localhost:3000/graphiql](http://localhost:3000/graphiql) and you will get a live editor that provides 
intelisence, schema type checking and documentation provided via #'s in our Type definitions.


## Cool things possible because of GraphQL
- Client side caching
- realtime data via subscriptions
- automagic prefetching of dynamic data requests on page load.
  * Provided you define a Type and Resolver for the FlexibleContentUnion (once again, see bellow)
- Happy developers
- Terse definition of required data without needing to buid 100 endpoints. Now for example if I were to build RedLily onto this I would 
have just passed the project Id's down to the other Projects CTA and write a query that request JUST 
the title, image, descr, link for each of the items rather than manual entry of these items :()
- Easy Infinite queries (i.e. related posts, the more button. TODO: put info on appending to an array query data) 

## FlexibleContentUnion and how to write awesome ACF Layouts

#### 100% optional, if you don't need to optimise your query, just do it as you always have, i.e. app/components/Acf/Layout/Services.jsx

Prior to adding Apollo GraphQL you would need to write custom code to prefetch data like a form on a per-page basis.
If you did not, the page would load and then after showing the client the awesome SSR, it would flash the form in afterwards
:( Thanks to resolvers in GraphQL we can now fix that!!

For an example of how to prefetch data, see app/components/acf/layout/FormSection
There are the following files:

* **FormSection.jsx** ACF React Component that renders the Field
* **FormSectionType.js** Defines the ACF Field data that will be passed to it (page.acf.layout)
* **formSectionResolvers.js** Contains the query to be ran whenever this field is returned in the ACF Layout

You will notice that this is similar to apollo/types/{TypeName}, of which it is! The main difference is that you
do not define a {TypeName}Queries.js file because we are not defining any Queries!! Instead we are opening 
app/components/acf/FlexibleContentUnion/index.js and adding our type to the FlexibleContentUnion Type's Union.

We do this because all we are doing with this code is defining a list of Types to resolve sub-queries from other
queries that utilise ACF.

Whenever you create a new FlexibleContentUnion resolver type (above) you must also:

1. Create a bundle for that Type inside of app/apollo/acfLayoutModules.js and add it to the apolloModule function
2. Add your type to the FlexibleContentUnion definition inside of app/component/Acf/FlexibleContentUnion/index.js
3. Add to the acf fragment your type and it's query (for example, if your using ACF in the Page query, you would add to: app/apollo/fragments/pageFragment.js, see FormSection under queryable)

:scream::scream::scream:
DANGER: do not import a GraphQL resolver into any code located inside of app/
All Server based code is located outside of app/ to avoid really weird node only dependancies being missing. For example:

```
ERROR in ./~/redis/index.js
Module not found: Error: Cannot resolve module 'net' in     C:\NodeServer\AppInTheWild\node_modules\redis
 @ ./~/redis/index.js 3:10-24

ERROR in ./~/redis/lib/parser/hiredis.js
Module not found: Error: Cannot resolve module 'hiredis' in C:\NodeServer\AppInTheWild\node_modules\redis\lib\parser
 @ ./~/redis/lib/parser/hiredis.js 3:14-32
```

if you see this happening it's probably because you imported a resolver that's used inside of the Acf field pre-fetching that
we described above. All files inside of app/ that you CANNOT import whilest you'r in app/ as it will cause node only deps
to leak in:

* app/apollo/acfLayoutModule
* app/apollo/addonApolloModules
* app/components/Acf/Layout/FormSections/formSectionsResolvers
* app/components/Acf/Layout/FormSections/formSectionsType

currently the only Server based code that's located inside of app/ is relating to the code which lets us define Acf fields 
so that we may pre-fetch (above) the code originally was located inside of apollo/types/Acf/Fields however this meant
that you needed to fly all the way out of your component's directory into apollo/ to do these changes
Of which you still need to move out of the directory to add the item to the FlexibleContentUnion and acfApolloModules, so
perhapse this should move back into apollo/ or maybe even apollo-custom/ so that we can still treat the ACF field
pre-fetching as a seperation from apollo/ as currently thanks to modules dev's shouldn't need to touch apollo/ to add
graphQL shcema
TODO: talk with Sam/Allen about what's more important. Having files close, or Server stuff not in app/

:scream::scream::scream:

## Type Module System

A late inclusion into Apollo GraphQL for Starward is the idea of modules. Previously all types and their resolvers were hooked up into
apollo/schema.js, but now apollo/types/index.js bundles each Type to it's resolver and then creates a module out of those
bundles! Because of this we now package all of our new Types and their resolvers into a single variable (module) which gives 
us the ability to get a list of modules and merge them!!

If you wish to add new Types and resolvers (say for an Instagram endpoint) simply build the Types and Resolvers wherever
you want (i.e. inside of app/components or a npm package for awesome re-usability!!) and then make a module from them and export
that modules from app/apollo/apolloModules.js (see the file for more info!).



## Types built into Starward

For now all documentation of what the inbuit types provide are given by the declaritive native of type definitions in 
GraphQL, if you feel like documenting them, place this here OR in a new file as this could be large.

**The remainder of this documentation is not required to understand how to work with the GraphQL in this project, it's more a brain dump of information about
how things work under the hood so that if you need to know why X is doing Y, you can!:**

The two root fields are RootQuery and Post. RootQuery is where you place all of your queries that resolve the queries 
for the schema first listed in this document (apollo/types/index.js). If your do not implement every query defined in the schema you will get an 
error from Apollo when it tries to assemble your schema. Likewise if you implement a query that does not exist on the schema 
an error will occur too. Inside of the apollo/schema.js file we merge all of the resolves together, so that each RootQuery 
will combine into one lage object which will include all of your queries. This is how we are able to split the resolver 
definition into multiple files/folders. There is one more root field on this object that is called RootMutation, this is 
the place where you put your mutation implementations into the resolver. Currently the only mutation is located inside of 
apollo/types/SubmittedForm/submittedFormQuery.js as such I did not make a seperate naming convention for the mutations 
implementation and called it submittedFormQuery, but perhapse a better name would be submittedFormMutation.js.

### Shaping data returned from the WP API

As you would have noticed on the Post field in the root of this object, we have some of the fields defined in the Post Type 
as laid out in the index.js for thsi folder. You can use this object to define any data shaping as show by excerpt or any 
API call chaining as shown by categories. The way this works is once the resolver, for example getPost returns or is resolved 
(if a promise is returned) the value returned will be first filtered by the callers GraphQL Query and then passed
through each of these fields, as you can see the returned value of the query is passed in as the first prop, so you may 
access any value returned by your query to forfill the shaping of your response. Any fields not placed inside of this object (Post) 
and requested byt the users Query will just pass through as they were returned.