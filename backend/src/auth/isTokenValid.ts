import jwt from 'jsonwebtoken';

const isTokenValid = (token: string) => {
  try {
    jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};

export { isTokenValid };
