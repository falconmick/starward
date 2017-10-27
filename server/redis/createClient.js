import redis from 'redis';
import redisProxy from './redisProxy';
import { isRedisEnabled } from '../utility/environment';
import { REDIS_PREFIX } from '../config/app';

const _redisClient = (keyPrefix) => {
  if (isRedisEnabled) {
    const client = redis.createClient();

    client.on('error', err => {
      console.log('Error connecting to Redis', err);
    });

    client.on('connect', () => {
      console.log('Connected to Redis');
    });

    return redisProxy(client, keyPrefix);
  }

  return redisProxy();
};
export default _redisClient;

export const redisClient = _redisClient(REDIS_PREFIX);
