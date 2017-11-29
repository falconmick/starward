import { inbuiltModule } from './types';
import { combineModules } from './utils/apolloModule';

// place your modules into combineModules (i.e. combineModules(inbuiltModule, yourModule, customExtensionModule)
export const getModule = () => combineModules(inbuiltModule);
