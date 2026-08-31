import type { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/UnauthorisedError";
import { ValidationError } from "../errors/ReqValidationError";
import { NotFoundError } from "../errors/NotFoundError";

/**
 * A middleware to check that the user is authenticated before passing the request over to endpoints that require authentication.
 * @param req - Request object
 * @param res - Response object
 * @param next - The next function in the cycle
 */
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId) {
    next();
  } else {
    throw new UnauthorizedError("You are not authenticated");
  }
};

export default authMiddleware;
