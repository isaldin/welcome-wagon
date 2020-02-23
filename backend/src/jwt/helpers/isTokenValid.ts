import { decode as jwtDecode } from 'jwt-simple';

// simple check
const isTokenValid = (token: string) => {
  try {
    jwtDecode(token, process.env.JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};

export { isTokenValid };
