import jwt from 'jsonwebtoken';

import CONFIG from 'constants/config';
import helpers from './index';

export const createAccessToken = payload => {
  return jwt.sign({...payload, type: CONFIG.jwt.tokens.access.type}, CONFIG.jwt.tokenSecret, {
    expiresIn: CONFIG.jwt.tokens.access.expiresIn,
  });
};

export const tokenDecode = async token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, CONFIG.jwt.tokenSecret, (error, decoded) => {
      if (error) {
        // TODO need to change error message
        reject(new helpers.errors.InvalidToken(error.message));
      } else {
        resolve(decoded);
      }
    });
  });
};
