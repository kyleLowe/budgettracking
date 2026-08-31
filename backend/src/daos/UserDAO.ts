import { Types } from "mongoose";
import User from "../models/User";

//Finds the user in the database using the userId
export const getUser = async (_userId: Types.ObjectId | undefined) => {
  const user = await User.findById(_userId).select("-password");
  return user;
};

//Checks if the email is already signed up to a user
export const findExistingUser = async (email: string) => {
  const existingUser = await User.findOne({ email: email });
  return existingUser;
};

//Creates the user in the database
export const createUser = async (
  name: string,
  password: string,
  email: string,
) => {
  const user = await User.create({
    name,
    password,
    email,
  });
  return user;
};

//Finds the password of a user
export const findUserPassword = async (email: string) => {
  const user = await User.findOne({ email: email }).select("+password");
  return user;
};
