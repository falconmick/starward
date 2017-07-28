import { createWordpressGraphqlProxy } from '../utils/queryTools';

const wpSettingsProxy = createWordpressGraphqlProxy('acf/v2/options');

const extractSettings = (settingsData) => {
  return settingsData.acf;
}

export default () => {
  return wpSettingsProxy.runQuery({dataCallback: extractSettings});
};

