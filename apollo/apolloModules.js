import { inbuiltModule } from './types';
import * as addonModules from '../app/init/addonApolloModules';
import { combineModules } from './utils/apolloModule';

// place your modules into combineModules (i.e. combineModules(inbuiltModule, yourModule, customExtensionModule)
const addonModuleArray = Object.keys(addonModules).map(key => addonModules[key]);
export const getModule = () => combineModules(inbuiltModule, ...addonModuleArray);
