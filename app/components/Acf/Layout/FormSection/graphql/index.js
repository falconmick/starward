// NOTE: Cannot import this inside of web app or redis will be included, which obviously doesn't work on client side!!
import { wrapFlexibleContentGraphQL } from '../../util';
import { resolvers } from './formSectionResolvers';
import { type, typeName } from './FormSectionType';

export const formSection = wrapFlexibleContentGraphQL({type, typeName, resolvers});
