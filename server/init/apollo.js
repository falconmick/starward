import {
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';
import bodyParser from 'body-parser';
import schema from '../../apollo/schema';

const setupGraphiql = (app) => {
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }));
}

export const setupApollo = (app) => {
  app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema
  }));
};

export const initApolloDebug = (app) => {
  setupApollo(app);
  setupGraphiql(app);
};
