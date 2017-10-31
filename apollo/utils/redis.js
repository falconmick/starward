import { redisClient, redisConfig } from '../../server/redis';
import { createIdFromArgs } from './pager';

export const cacheResolver = (queryName, options = {}) => func => (obj, args) => {
  const { timeout = redisConfig.redisLongExpiry } = options;
  const argsAsKeyPart = createIdFromArgs(JSON.stringify(args));
  const cacheKey = `${queryName}-${argsAsKeyPart}`;

  return new Promise((resolve, reject) => {
    redisClient.get(cacheKey)
      .then(cacheResult => {
        const { cacheHit, result } = cacheResult;
        if (cacheHit) {
          const parsedResult = JSON.parse(result);
          resolve(parsedResult);
        } else {
          // resolve the request
          const potentialPromise = func(obj, args);

          // note: Promise.all accepts non promises too! it just synchronously returns
          // this way our query resolvers can return values instantly or via promise
          Promise.all([potentialPromise])
            .then(([returnValue]) => {
              const returnValueAsString = JSON.stringify(returnValue);
              redisClient.setex(cacheKey, timeout, returnValueAsString);
              resolve(returnValue);
            })
            .catch(cacheError => {
              reject();
            });
        }
      })
      .catch(cacheError => {
        reject();
      });
  });
};
