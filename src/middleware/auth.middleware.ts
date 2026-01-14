import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provider" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = verifyToken(token!);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expires token" });
  }
}
