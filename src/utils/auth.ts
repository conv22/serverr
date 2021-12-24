import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const validatePassword = async (
  password: string,
  userPassword: string
): Promise<boolean | Error> => {
  const isEqual = await bcrypt.compare(password, userPassword);
  if (!isEqual) return new Error("Passwords dont match");
  return true;
};

export const validateUserName = (username: string): boolean | Error => {
  return true;
};

export const generateAccessToken = (id: number) => {
  const token = jwt.sign({ userId: id }, process.env.JWT_SECRET as string, {
    algorithm: "RS256",
    expiresIn: 60 * 60,
  });
  return token;
};
