import axios from 'axios';
import { WP_API } from '../../config/app';

/* ----------- WP REST API v2 endpoints ----------- */
const wpSettingsURL = `${WP_API}/acf/v2/options/`;

export default () => {
  return new Promise((resolve, reject) => {
    axios.get(wpSettingsURL)
      .then(res => {
        resolve(res.data.acf);
      });
  });
};

