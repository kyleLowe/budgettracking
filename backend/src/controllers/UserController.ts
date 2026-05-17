import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { NotFoundError } from '../errors/NotFoundError';
import * as UserService from '../services/UserServices';

export const getAuthenticatedUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //Gets the userId and checks if the user is in the database

    const _userId: Types.ObjectId | undefined = req.session.userId;
    const user = await UserService.getUser(_userId);
    if (!user) {
      throw new NotFoundError('User was not found in our system, please ensure you are logged in');
    }
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};