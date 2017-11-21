# Apollo GraphQL

This project uses Apollo GraphQL as its primary form of data transport between the server and your front end app. It is comprised of the following queries:

- settings: Settings
- page(splat: String): Page
- pages(query: String, page: Int, perPage: Int): PagePager
- menuItems(slug: String): [MenuItem]
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
You can find these queries located inside of apollo/schema.js.

## Types, Queries, Mutations

the types, queries, mutations and resolvers all reside within feature folders inside of the directory apollo/types. 
The Actual types themselves by convetion are located inside of index.js. The Queries and Mutations are located inside 
apollo/type/{TypeName}/{typeName}Resolvers.js and the code that is ran to feed these queries/mutations are located within
apollo/type/{TypeName}/{typeName}Queries.js. The implementations of the queries are seperated into different files as so that
we may reference the queryies from within multiple Resolvers which comes in handy when your want to join API calls. 

Joining API Calls and shaping/cleaning data is achieved by adding fields to the Types resolver, an example of this can be
 seen inside of apollo/types/Post/postResolver.js where we are both joining api calls with categories (Post->categories) 
 as well as shaping data with excerptResolvers (converts a WpContent api data shape into a plain string!)
 
As you might have noticed, its only required that an index file is created (example apollo/types/Yoast) this is because 
sometimes an API call will return an object as a JSON field, so basically all your using this type for is a place for that
data to be palced and a way to query just what you need!

the {typeName}Resolver.js file has the following main fields on the object it returns, see for example an example Post resolver

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

The two root fields are RootQuery and Post. RootQuery is where you place all of your queries that resolve the queries 
for the schema first listed in this document. If your do not implement every query defined in the schema you will get an 
error from Apollo when it tries to assemble your schema. Likewise if you implement a query that does not exist on the schema 
an error will occur too. Inside of the apollo/schema.js file we merge all of the resolves together, so that each RootQuery 
will combine into one lage object which will include all of your queries. This is how we are able to split the resolver 
definition into multiple files/folders. There is one more root field on this object that is called RootMutation, this is 
the place where you put your mutation implementations into the resolver. Currently the only mutation is located inside of 
apollo/types/SubmittedForm/submittedFormQuery.js as such I did not make a seperate naming convention for the mutations 
implementation and called it submittedFormQuery, but perhapse a better name would be submittedFormMutation.js.

As you would have noticed on the Post field in the root of this object, we have some of the fields defined in the Post Type 
as laid out in the index.js for thsi folder. You can use this object to define any data shaping as show by excerpt or any 
API call chaining as shown by categories. The way this works is once the resolver, for example getPost returns or is resolved 
(if a promise is returned) the value returned will be first filtered by the callers GraphQL Query and then passed
through each of these fields, as you can see the returned value of the query is passed in as the first prop, so you may 
access any value returned by your query to forfill the shaping of your response. Any fields not placed inside of this object (Post) 
and requested byt the users Query will just pass through as they were returned.

## How To Query!

I would reccomend reading through the following documentation if you need to write/modify any queries and run into troubles: 
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

To break it down, we define a query using gql and template litterals, queries can have
paramaterised inputs as shown by $page: Int and then can query multiple queries!, i.e. posts, categories and settings! 
each of the posts(params), categories and settings will be cached, however if you request only a name from settings and then 
more data the next time, it will need to fetch from the sever again... This is why we use fragments as show by the 
(...archivePost) to read more look at apollo's docs. By using fragments you ensure that the queries you write are highly 
cachable and don't result int multiple requests for almost exactly the same datal! However the flexibility 
of writing queries without fragments is not to be dismissed!

Next we use the graphql HOC provided by react-apollo to run the query we just defined. Optionally we can pas options into this as
the second paramater. Once again do read the docs, but basically it's here we pass the paramaterised variables (we do this 
so that in the future if we use a plugin to compile queries, we will be able to reduce graphQL queries size over the wire, see 
docs if you wonna know how!). Also I am using props, I do this because I like to re-shape the data that 
my query returns. This is optional!! Finally just like redux's connect we pass the original Component in as the curried function's
second part!

However, just like in Redux land, all of your page data is retrieved via the Page.jsx component which does all the querying 
for you!! 

#### How to build Queries?
whilest in dev goto: [localhost:3000/graphiql](http://localhost:3000/graphiql) and you will get a live editor that provies 
intelisence, schema type checking and documentation provided via #'s in our Type definitions.


## Cool things possible because of GraphQL
- Client side caching
- realtime data via subscriptions
- automagic prefetching of dynamic data requests on page load.
  * What this means is that if you have a form Field on your ACF page, on first page load via the magic of SSR the form 
  will be pre-fetched and no popping of the form going from loading -> loaded!
  * HOWEVER once you have already loaded first page load, between pages currently we don't have a way to either 1. prefetch 
  ACF fields on Page.jsx query running or 2. showing loading screen whilest subqueries are ran as a result of the page query 
  returning ACF fields which have their own GraphQL queries. However we should be able to get a total GraphQL network status 
  and figure out if we have any sub-queries loading still and show that loading screen! Please add either of these if you have 
  the time!
  * pre-fetching is (somewhat) possible via createCustomPage, see FormPage.jsx for an example implementation that pre-fetches the form 
  for this page. This is only possible when you know what queries to run before the page is executed, for example 
  when you access /contact-page you might know that you will need formId 3, so you can safely pre-fetch!
- Happy developers
- Terse definition of required data without needing to buid 100 endpoints. Now for example if I were to build RedLily onto this I would 
have just passed the project Id's down to the other Projects CTA and write a query that request JUST 
the title, image, descr, link for each of the items rather than manual entry of these items :()
- Probably more, but it's 1am so I forget!

## Types built into Starward

For now all documentation of what the inbuit types provide are given by the declaritive native of type definitions in 
GraphQL, if you feel like documenting them, place this here OR in a new file as this could be large.