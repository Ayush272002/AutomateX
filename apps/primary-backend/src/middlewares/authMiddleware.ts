import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import RequestWithUser from "../interface/RequestWithUser";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1] as string;
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;
    (req as RequestWithUser).id = decoded.id;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized" });
  }
};
