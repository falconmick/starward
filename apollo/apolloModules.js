import inbuiltModule from './types';
import { apolloModule } from './utils/apolloModule';

// either place entire modules crafted with apolloModule or a destructured array
// of apolloBundles
const modules = [
  inbuiltModule,
  // your-bundle/modules-here!
];

export default apolloModule(...modules);
