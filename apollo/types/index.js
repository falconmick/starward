import {AcfBundle} from './Acf';
import {BetterFeaturedImageBundle} from './BetterFeaturedImage';
import {CategoryBundle} from './Category';
import {FormBundle} from './Form';
import {MediaBundle} from './Media';
import {MenuItemBundle} from './MenuItem';
import {PageBundle} from './Page';
import {PostBundle} from './Post';
import {SettingsBundle} from './Settings';
import {SubmittedFormBundle} from './SubmittedForm';
import {TagBundle} from './Tag';
import {UserBundle} from './User';
import {YoastBundle} from './Yoast';
import { apolloModule } from '../utils/apolloModule';

export default apolloModule(AcfBundle, BetterFeaturedImageBundle, CategoryBundle, FormBundle, MediaBundle,
  MenuItemBundle, PageBundle, PostBundle, SettingsBundle, SubmittedFormBundle, TagBundle, UserBundle, YoastBundle);
