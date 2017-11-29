# Extending The Schema

to add to the schema a new endpoint or resource, you typically need the following 2 items.

1. Type definition
2. Resolver for Type's Queries

The folder structure used is as follows (all placed within apollo/types):

    {TypeName}/
            ---index.js             -- Type
            ---{typeName}Resolver   -- Resolver
            ---{typeName}Query      -- Query implementations for Resolver
            
bellow is an example of what this might look like

index.js
    
    import CoolTypeExample from './CoolTypeExample

    const User = `
    type User {
        id: ID!
        name: String!
        url: String
        cooleos: CoolTypeExample
        slug: String!
        avatar_urls: RawJson
        meta: [String]!
    }
    `;
    
    export default () => [User, CoolTypeExample];
    export { resolvers } from './userResolvers';
    
this file is comprised of:
1. type is defined using template litterals, for more information on graphQL syntax, I suggest google, it's quite the resource! 
Do note however, commas will not break your definitions if placed at the end of each line, however they will look ugly
2. export default, when we export our type so that our schema may consume it, we export it as a function because on occation 
a Type will reference a Type which also references it. So we need to make sure as Apollo creaes our schema, that it knows of 
all types needed to make this type! And we return as a function call and not a plain boring array to avoid circular dependancies!
3. export the resolver for this type! Coming up next in this example is the resolver, basically we export the Type and Resolver from 
this file so that we only need one import line per Type!!!

userResolver.js

    import { getUsers, getUser } from './userQueries';
    import { querySomeBooks } from '../Book/bookQueries';
    
    export const resolvers = {
      RootQuery: {
        users: getUsers,
        user: getUser
      },
      RootMutation: {},
          user: {
            cooleos: ({cooleos}) => {
                return { whatsCool: `${cooleos} is cool` };
            },
          books: ({favouriteBookIds}) {
            return querySomeBooks(favouriteBookIds);
          }
      }
    };

this file returns an object comprised of:
1. RootQuery, this is where you link the queries outlined inside of schema.js to the actual code that get's the data!
2. RootMutation, same as Query, but mutations!
3. User, this is used for any custom resolving you need to do for the data returned by your RootQueries or to stitch 
together other types that need to be called! For example User might have favourite books where are exposed under books, 
you have to call the right endpoint to get the books given the users favouriteBookIds

userQueries.js

    import { createWordpressGraphqlProxy } from '../../utils/queryTools';
    import { cacheResolver } from '../../utils/redis';
    
    const wpUserProxy = createWordpressGraphqlProxy('wp/v2/users');
    
    export const getUsers = cacheResolver('getUsers')(() => {
      return wpUserProxy.selectAll();
    });
    
    export const getUser = cacheResolver('getUser')((obj, { id }) => {
      return wpUserProxy.select(id);
    });
    
    export const getUserNotCached = (obj, { id }) => {
      return wpUserProxy.select(id);
    });
    
This file just provides the calls out to the API to resolve the data we requested. createWordpressGraphqlProxy is a tool 
I invented that generalises calling the WP API as the lovely people at WP actually are pretty consistant with both 
naming of paramaters and the way you access data. If you want to know how it works, open it up and find how i used each 
of the functions, like selectAll.
Also I wrap each resolver function in a HOF called cacheResolver which will cache the given function into redis if the 
props passed in (second paramater of the function, see (, { id }) for getUser) and the unique name passed as the first 
value before the function in the next part of the curry. 
If you don't want your call cached, just don't use the cacheResolver HOF as shown by getUserNotCached, I don't remember what
the first paramater is, but the second is the values passed in by the query's paramaters.

## How to hook into the inbuilt schema

if you are not creating your own standalone module (you would do this when you plan on making the code re-usable, perhapse
you plan to place it inside of a NPM package) all you need to do is open 'apollo/types/index.js' and first import your 
type and reducer (reducer is optional), create a bundle via apolloBundle (once again, you don't have to include a reducer)
next you place any of your queries/mutations into rootQuery/rootMutation and finally you add the bundle to apolloModule args!:

    import YourType, { resolvers as yourTypeResolvers } from './YourType';
    
    const YourTypeBundle = apolloBundle({type: YourType, resolvers: yourTypeResolvers});
    
    const rootQuery = `
      ...
      youType(slug: String!): YourType
      ...
    `;
    
    const rootMutation = `
      ...
      submitYouType(form: YouTypeInput!): YouType!
      ...
    `;
    
    export const inbuiltModule = apolloModule(/* other bundles here*/, YourTypeBundle)(rootQuery)(rootMutation);
    
This will add your Type and it's resolvers to the schema!!!

## How to create your own standalone apollo module

The process of creating your very own standalone apollo module (a module that is fully standalone from the inbuilt apollo
module (but still can use extend!), the main benifit of this is re-use over projects via NPM). It's exactly the same as 
building new types to extend the inbuilt schema (see the above) but instead of creating your types inside of 'apollo/types'
you create them in your very own folder where-ever you please. The only added step is to make sure you create your own
module bundler as seen inside of 'apollo/types/index.js', from there you open 'apollo/apolloModules.js' and add your module to 
combineModules, and BAM! you have your very own external module hooked into the schema!