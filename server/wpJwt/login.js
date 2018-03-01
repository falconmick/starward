import axios from 'axios';
import { WP_API} from '../config/app';

export const loginUser = (req, res) => {
  const { username, password } = req.body;
  const requestBody = {
    username,
    password,
  };

  const jwtLoginUrl = `${WP_API}/jwt-auth/v1/token`;
  axios.post(jwtLoginUrl, requestBody)
    .then((serverRes) => {
      const { data } = serverRes;
      const { token } = data;
      return res.json({success: true, token});
    })
    .catch(() => {
      res.status(401);
      return res.json({success: false});
    });
  // res.status(500);
  // return res.json({success: true, data: response.data});
};
