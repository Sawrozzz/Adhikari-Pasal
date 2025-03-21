import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  email: string;
  exp: number;
  iat: number;
  role: string;
  userId: string;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded;
  } catch (error) {
    console.error("Error decoding toeken", error);
    return null;
  }
};
