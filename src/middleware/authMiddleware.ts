import jwt from "jsonwebtoken";

import { SERVER } from "../config";
import { NextFunction, Request, Response } from "express";

const catchError = (err: any, res: Response) => {
  if (err instanceof jwt.TokenExpiredError) {
    return res.status(401).json({ message: "Unauthorized. Expired token" });
  }

  return res.status(401).json({ message: "Unauthorized" });
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers["authorization"]?.replace("Bearer ", "");

  if (!token) {
    return res.status(403).json({ message: "No access token provided" });
  }

  jwt.verify(token, SERVER.JWT_SECRET_KEY, (err) => {
    if (err) {
      return catchError(err, res);
    }

    next();
  });
};
