import axios from 'axios';
import { WP_API, COOKIE_EXPIRE_AFTER } from '../config/app';
import { isDebug } from '../../app/config/app';

const createJwtCookie = ({res, token}) => {
  const options = {
    maxAge: COOKIE_EXPIRE_AFTER,
    httpOnly: true, // The cookie only accessible by the web server
    signed: true // Indicates if the cookie should be signed
  };

  const securePrefix = isDebug ? '' : '__Secure-'; // add secure flag if not debug
  // Set cookie
  res.cookie(`${securePrefix}jwt_token`, token, options);
};

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
      createJwtCookie({res, token});
      return res.json({success: true, token});
    })
    .catch(() => {
      res.status(401);
      return res.json({success: false});
    });
  // res.status(500);
  // return res.json({success: true, data: response.data});
};
