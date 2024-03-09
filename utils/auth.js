// utils/auth.js

import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'defaultSecretKey';

export const generateAuthToken = (userId, email) => {
  const payload = {
    userId,
    email,
  };

  const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });
  return token;
};
