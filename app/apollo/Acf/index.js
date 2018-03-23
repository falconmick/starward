// inside this folder you can copy/paste the apollo/type/acf so that you can create a custom set of
// acf queryable FlexibleContentUnion types. In non cryptic language, that means you can write more
// queries and types to resolve your non page based acf fields.
//
// however the other option is to just place post's acf and page's acf custom queryables into the same
// thing, and then it doesn't matter because page won't request post's stuff. It's just a way to split
// the code up and keep it clean.

// this is all you need, adding more layout modules just lets you keep acf queryable Union smaller
export { layoutModules as pageAcfLayoutModule } from './pageAcfLayoutModule';
