import { Request, Response, NextFunction } from "express";
import { AuthObject } from "@clerk/express";
import ForbiddenError from "../../domain/errors/forbidden-error";

interface SessionClaims {
  metadata?: {
    role?: string;
  };
}

interface AuthenticatedRequest extends Request {
  auth?: AuthObject & {
    sessionClaims?: SessionClaims;
  };
}

export const isAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const role = req.auth?.sessionClaims?.metadata?.role;

  if (role !== "admin") {
    throw new ForbiddenError("Access denied. Admins only.");
  }
  next();
};