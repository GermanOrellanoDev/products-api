import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "sercret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "15m";

export interface JwtPayload {
  userId: string;
  role: string;
}

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
