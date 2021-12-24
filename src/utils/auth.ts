import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const generateAccessToken = (id: number) => {
  const token = jwt.sign({ userId: id }, process.env.JWT_SECRET as string, {
    algorithm: "RS256",
    expiresIn: 60 * 60,
  });
  return token;
};

export const comparePasswords = async (
  password: string,
  hash: string
): Promise<Boolean> => {
  const result = await bcrypt.compare(password, hash);
  return result;
};

export const hashPassword = async (password: string): Promise<string> => {
  const result = await bcrypt.hash(password, 10);
  return result;
};
