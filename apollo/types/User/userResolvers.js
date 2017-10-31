import { getUsers, getUser } from './userQueries';

export const resolvers = {
  RootQuery: {
    users: getUsers,
    user: getUser
  }
};
