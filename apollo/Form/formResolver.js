/* eslint-disable camelcase */
import moment from 'moment';
import { getForm } from './formQueries';

export const resolvers = {
  RootQuery: {
    form: getForm,
  },
  Form: {
    isActive: ({is_active}) => {
      return is_active === '1';
    },
    isTrash: ({is_trash}) => {
      return is_trash === '1';
    },
    dateCreated: ({date_created}) => {
      const asMoment = moment.utc(date_created);
      return asMoment.toISOString();
    },
    confirmations: ({confirmations}) => {
      const confirmationArray = Object.keys(confirmations).map(key => {
        const conf = confirmations[key];
        const spreadValueFromKey = {...conf};
        return spreadValueFromKey;
      });

      return confirmationArray;
    }
  }
};
