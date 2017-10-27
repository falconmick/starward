import { createKeyGenerator, debugLogger } from '../utility';

const redisDebugLogger = debugLogger('ms', 'redix: ');

export default (client, keyPrefix) => {
  if (!client) {
    console.log();
    console.log('Redis is being bypassed as it is disabled');
    console.log();
  }

  const keyGenerator = createKeyGenerator(keyPrefix);

  const __cacheHit = result => {
    return {
      result,
      cacheHit: true,
    };
  };
  const __cacheMiss = () => {
    return {
      result: null,
      cacheHit: false,
    };
  };

  const __get = (key) => {
    return new Promise((resolve, reject) => {
      if (client) { // if redis enabled
        const fullKey = keyGenerator(key);
        redisDebugLogger(`get( ${fullKey} ) start`);
        client.get(fullKey, (err, result) => {
          if (err) {
            reject(err);
          } else if (result === null) {
            resolve(__cacheMiss());
          } else {
            resolve(__cacheHit(result));
          }
        });
        redisDebugLogger(`get( ${fullKey} ) end`);
      } else {
        resolve(__cacheMiss());
      }
    });
  };

  const __setex = (key, secondsToExpire, strData) => {
    if (client) {
      const fullKey = keyGenerator(key);
      redisDebugLogger(`setex( ${fullKey}, ${secondsToExpire}, ${strData} ) start`);
      client.setex(fullKey, secondsToExpire, strData);
      redisDebugLogger(`setex( ${fullKey}, ${secondsToExpire}, ... ) end`);
    }
  };

  const __flushdb = () => {
    return new Promise((resolve, reject) => {
      if (client) {
        redisDebugLogger('flushdb start');
        client.flushdb((err, result) => {
          if (err) {
            redisDebugLogger('flushdb was a failure');
            reject(err);
          } else {
            redisDebugLogger('flushdb was successful');
            resolve(result);
          }
        });
      }
    });
  };

  return {
    get: __get,
    setex: __setex,
    flushdb: __flushdb
  };
};