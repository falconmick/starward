// place any 3rd party or custom modules to be built into the main apollo GraphQL schema here.
// i.e. export { InstagramModule } from './components/instagram/module'
//
// apollo/apolloModules searches this file for all modules and adds them into the root schema.
//
// to find out how to create modules, please checkout the built in module over at apollo/types/index.js
// basic pattern is bundle the type and resolver via apolloBundle and then combine all of those bundles
// into a module by apolloModule

export { layoutModules } from './acfLayoutModule';
export { examplePostTypeModule } from './examplePostTypeModule';
