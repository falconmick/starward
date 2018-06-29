import Acf, { resolvers as acfResolvers } from './Acf';
import BetterFeaturedImage from './BetterFeaturedImage';
import Form, { resolvers as formResolvers } from './Form';
import Media, {resolvers as mediaResolvers } from './Media';
import MenuItem, { resolvers as menuItemResolvers } from './MenuItem';
import Page, { resolvers as pageResolvers } from './Page';
import { postBundles } from './Post';
import Settings, { resolvers as settinsResolvers } from './Settings';
import SubmittedForm, { resolvers as submittedFormResolvers } from './SubmittedForm';
import Tag, { resolvers as tagResolvers } from './Tag';
import User, { resolvers as userResolvers } from './User';
import Yoast from './Yoast';
import { apolloModule } from '../utils/apolloModule';
import { apolloBundle} from '../utils/apolloBundle';

const AcfBundle = apolloBundle({type: Acf, resolvers: acfResolvers});
const BetterFeaturedImageBundle = apolloBundle({type: BetterFeaturedImage});
const FormBundle = apolloBundle({type: Form, resolvers: formResolvers});
const MediaBundle = apolloBundle({type: Media, resolvers: mediaResolvers});
const MenuItemBundle = apolloBundle({type: MenuItem, resolvers: menuItemResolvers});
const PageBundle = apolloBundle({type: Page, resolvers: pageResolvers});
const SettingsBundle = apolloBundle({type: Settings, resolvers: settinsResolvers});
const SubmittedFormBundle = apolloBundle({type: SubmittedForm, resolvers: submittedFormResolvers});
const TagBundle = apolloBundle({type: Tag, resolvers: tagResolvers});
const UserBundle = apolloBundle({type: User, resolvers: userResolvers});
const YoastBundle = apolloBundle({type: Yoast});

// note: postBundles is an array of bundles which is why I am destructing it.
export const inbuiltModule = apolloModule(AcfBundle, BetterFeaturedImageBundle, FormBundle, MediaBundle, ...postBundles,
  MenuItemBundle, PageBundle, SettingsBundle, SubmittedFormBundle, TagBundle, UserBundle, YoastBundle);

