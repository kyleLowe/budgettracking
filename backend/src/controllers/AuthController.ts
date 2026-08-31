import { HTTPStatusCode } from "../constants/http-status-codes";
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../errors/ReqValidationError";
import { UnauthorizedError } from "../errors/UnauthorisedError";
import { ConflictError } from "../errors/ConflictError";
import * as AuthService from "../services/AuthServices";
import * as UserService from "../services/UserServices";

/**
 * Endpoint to allow users to register
 * @param req The request object
 * @param res The response object
 * @param next The next function (next midleware handler in the tree)
 */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, password, email } = req.body;

  try {
    //Checks if the name, password and emails fields have values
    if (!name || !password || !email) {
      throw new ValidationError(
        "You are missing some fields required to create an account",
      );
    }

    const existingUser = await UserService.findExistingUser(email);

    if (existingUser) {
      throw new ConflictError("A user with this email already exists");
    }

    const user = await UserService.createUser(name, password, email);
    req.session.userId = user._id;
    res.status(HTTPStatusCode.Created).json({
      name,
      email,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Endpoint to allow users to login. We valiate the username and password, if valid set the sesion user id and return the user
 * @param req
 * @param res
 * @param next
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new ValidationError("Missing parameters");
    }

    const user = await UserService.findUserPassword(email);

    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const passwordMatch = await AuthService.comparePassword(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedError("Invalid credentials");
    }

    req.session.userId = user._id;
    const userID = user._id;
    const userToReturn = await UserService.getUser(userID);
    res.status(200).json({ userToReturn });
  } catch (error) {
    next(error);
  }
};

/**
 * Endpoint to allow users to logout. Once they click logout this endpoint will destroy/invalidat their token
 * (gets deleted from the database) and the cookie is automatically cleared
 * @param req
 * @param res
 * @param next
 */
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.session.destroy((error: any) => {
    if (error) {
      next(error);
    } else {
      res.clearCookie("connect.sid", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
      });
      res.status(200).json({ message: "Successfully logged out" });
    }
  });
};

export const test = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "Test endpoint working" });
};
