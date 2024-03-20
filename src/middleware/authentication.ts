import type { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export function Authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authentication;
  let jwtPayload;

  try {
    jwtPayload = jwt.verify(token, process.env.JWT_SECRET, {
      maxAge: process.env.JWT_EXPIRE,
    });
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(401).json({ status: "failed", message: "Unauthorized." });
    return;
  }

  const { userId, username, role } = jwtPayload;
  const newToken = jwt.sign(
    { userId, username, role },
    process.env.JWT_SECRET,
    {
      expiresIn: 10,
    }
  );
  res.setHeader("token", newToken);

  next();
}
