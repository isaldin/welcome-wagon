import { encode as jwtEncode } from 'jwt-simple';

const generateTokenForEmail = (email: string) =>
  jwtEncode(
    { exp: Math.floor(Date.now() / 1000) + 30, email },
    process.env.JWT_SECRET,
  );

export { generateTokenForEmail };
