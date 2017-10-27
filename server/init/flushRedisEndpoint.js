import moment from 'moment';
import { REDIS_PREFIX } from '../config/app';
import { createRedisClient } from '../redis';

const client = createRedisClient(REDIS_PREFIX);

// WARNING
// Do not use this, I originally deleted this file as
// ALL COMUNICATIONS ARE TO BE VIA GRAPHQL
// however I don't really feel like implementing GraphQL
// in Wordpress... And wordpress needs to be able to flush
// the redis cache... Bummer..
export default(app) => {
  /* ----------- Redis Endpoints ----------- */
  /* Flush Redis */
  app.get('/api/flushredis', (req, res) => {
    console.log('test flushredis');
    console.log(`${moment().format()} flushing Redis cache`);
    client.flushdb()
      .then(() => {
        return res.json({success: true});
      })
      .catch(err => {
        return res.json({error: err});
    });
  });
};
