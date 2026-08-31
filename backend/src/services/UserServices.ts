import { Types } from "mongoose";
import * as UserDAO from "../daos/UserDAO";

export const getUser = async (_userId: Types.ObjectId | undefined) => {
  const user = await UserDAO.getUser(_userId);
  return user;
};

export const createUser = async (
  name: string,
  password: string,
  email: string,
) => {
  const user = await UserDAO.createUser(name, password, email);
  return user;
};

export const findExistingUser = async (email: string) => {
  const existingUser = await UserDAO.findExistingUser(email);
  return existingUser;
};

export const findUserPassword = async (email: string) => {
  const user = await UserDAO.findUserPassword(email);
  return user;
};
