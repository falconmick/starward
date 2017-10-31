import { createWordpressGraphqlProxy } from '../../utils/queryTools';
import { cacheResolver } from '../../utils/redis';

const wpSettingsProxy = createWordpressGraphqlProxy('acf/v2/options');

const extractSettings = (settingsData) => {
  return settingsData.acf;
}

export const getSettings = cacheResolver('getSettings')(() => {
  return wpSettingsProxy.runQuery({dataCallback: extractSettings});
});

