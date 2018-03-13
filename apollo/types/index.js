import Acf, { resolvers as acfResolvers } from './Acf';
import BetterFeaturedImage from './BetterFeaturedImage';
import Category, { resolvers as categoryResolvers } from './Category';
import Form, { resolvers as formResolvers } from './Form';
import Media, {resolvers as mediaResolvers } from './Media';
import MenuItem, { resolvers as menuItemResolvers } from './MenuItem';
import Page, { resolvers as pageResolvers } from './Page';
import Post, { resolvers as postResolvers } from './Post';
import Settings, { resolvers as settinsResolvers } from './Settings';
import SubmittedForm, { resolvers as submittedFormResolvers } from './SubmittedForm';
import Tag, { resolvers as tagResolvers } from './Tag';
import User, { resolvers as userResolvers } from './User';
import Yoast from './Yoast';
import { apolloModule } from '../utils/apolloModule';
import { apolloBundle} from '../utils/apolloBundle';

const AcfBundle = apolloBundle({type: Acf, resolvers: acfResolvers});
const BetterFeaturedImageBundle = apolloBundle({type: BetterFeaturedImage});
const CategoryBundle = apolloBundle({type: Category, resolvers: categoryResolvers});
const FormBundle = apolloBundle({type: Form, resolvers: formResolvers});
const MediaBundle = apolloBundle({type: Media, resolvers: mediaResolvers});
const MenuItemBundle = apolloBundle({type: MenuItem, resolvers: menuItemResolvers});
const PageBundle = apolloBundle({type: Page, resolvers: pageResolvers});
const PostBundle = apolloBundle({type: Post, resolvers: postResolvers});
const SettingsBundle = apolloBundle({type: Settings, resolvers: settinsResolvers});
const SubmittedFormBundle = apolloBundle({type: SubmittedForm, resolvers: submittedFormResolvers});
const TagBundle = apolloBundle({type: Tag, resolvers: tagResolvers});
const UserBundle = apolloBundle({type: User, resolvers: userResolvers});
const YoastBundle = apolloBundle({type: Yoast});

const rootQuery = `
  settings: Settings
  page(splat: String): Page
  pages(query: String, page: Int, perPage: Int): PagePager
  menuItems(slug: String): [MenuItem]
  categories(listOfIds:[Int!]): [Category]
  category(id: Int!): Category
  post(slug: String!): Post
  posts(query: String, page: Int, perPage: Int): PostPager
  users: [User]
  user(id: Int!): User
  media(id: Int!): Media
  tag(id: Int!): Tag
  tags(listOfIds:[Int!]): [Tag!]
  form(formId: Int!): Form
`;

const rootMutation = `
  submitForm(form: SubmittedFormInput!): SubmittedForm!
`;

export const inbuiltModule = apolloModule(AcfBundle, BetterFeaturedImageBundle, CategoryBundle, FormBundle, MediaBundle,
  MenuItemBundle, PageBundle, PostBundle, SettingsBundle, SubmittedFormBundle, TagBundle, UserBundle, YoastBundle)(rootQuery)(rootMutation);

