import bcrypt from "bcrypt";

export const comparePassword = async (
  inputPassword: string,
  userPassword: string,
) => {
  const passwordMatch = await bcrypt.compare(inputPassword, userPassword);
  return passwordMatch;
};
