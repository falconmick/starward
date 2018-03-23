# Extending The Schema

to add to the schema a new endpoint or resource, you typically need the following 2 items.

1. Type definition
2. Resolver for Type's Queries

The folder structure used is as follows (all placed within app/apollo/types):

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
        User: {
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
created to generalises calling the WP API as the lovely people at WP actually are pretty consistant with both 
naming of paramaters and the way you access data. If you want to know how it works, open it up and find how i used each 
of the functions, like selectAll.
Also I wrap each resolver function in a HOF called cacheResolver which will cache the given function into redis if the 
props passed in (second paramater of the function, see (, { id }) for getUser) and the unique name passed as the first 
value before the function in the next part of the curry. 
If you don't want your call cached, just don't use the cacheResolver HOF as shown by getUserNotCached, I don't remember what
the first paramater is, but the second is the values passed in by the query's paramaters. todo: the first param is usually
where the args from a non RootQuery call happen, perhapse when a non RootQuery (i.e. User: books()=>{...}) from the resolver above) calls
the resolver, we should instead pass params into the second paramater as so that we don't use the first arg for anything.
an example of where the non RootQuery uses the first param is apollo/factory/postType/createPostTypeResolver's createResolver


## How to hook your type and resolver in!

if you wish to add your new types and resolvers in, simply follow the patterns shown inside of apollo/types/index.js
you will notice the following important methods!
1. apolloBundle
2. apolloModule
also note how this file has a string defining the RootQueries and RootMutations, you will need to create one too to line up
with the types that you exported to your resolver's RootQuery and RootMutation.
after you copy how modules are made, you should end up with a single awesome module that's all yours! your last task is to
import then export that module in a special folder that apollo looks in for add-in modules called: app/apollo/addonApolloModules.js
for an example of this see the file! also note that examplePostTypeModule can be removed and layoutModules is how we achieve ACF Field pre-fetching!

## Tips ##
when you are working on/modifying the GraphQL types that come inbuilt with starward, avoid editing apollo/ at all costs.
it should be treated like a node_modle, or even better yet (as I want this to happen) a variant of create-react-app. 
When you do edit it, it's kinda like create-react-app's eject functionality, you get full access of which is super
complicated and you will no longer receive updates :( however if you make all of your new Types inside of app/apollo
there would be nothing stopping you (except major releases) from deleting your apollo/ directory and copying the new one
in (kinda like npm's node_modules!)

Above explains how to make fully custom modules, however there is also factories inside of appolo/factory that will create
you custom post types and taxonomies with 0 graphQL code! If you ever needed to do anything crazy, you could just look into
how it's done inside of apollo/types and then place your custom version into app/apollo/types/

### Extending ###
say you have a requirement to show what the weather was like on the day a post was created, rather than going into
apollo/types/posts and modifying you should consider instead using extending. you can [read about it here](https://www.apollographql.com/docs/graphql-tools/generate-schema.html#extend-types) 
but put basically you would make something like this:

```
    type WeatherData {
        isRaining
        isSunny
    }
    extend type Post {
        weather: WeatherData
    }
```

all that would remain for this code to work is to create a resolver that fetches the weather data for the Post type and your done!
There is no need to re-define the resolvers for the post data as that resolver will still be called, this basically
just tacks on your query to the Post query. From there the Post page would query for 

```
    const resolvers = {
        Post: {
            weather: ({created}) => getWeatherFor({date: created})),
        },
    };
```