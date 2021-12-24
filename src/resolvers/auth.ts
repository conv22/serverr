import bcrypt from "bcrypt";
import { myContext } from "../types/context";
import { generateAccessToken, validatePassword } from "../utils/auth";

type userBody = {
  username: string | null;
  password: string | null;
};

export const authResolver = {
  Mutation: {
    login: async (
      _parent: any,
      { username, password }: userBody,
      { prisma }: myContext
    ) => {
      if (!username || !password) return;
      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });
      if (!user) return;
      const isValidPassword = validatePassword(password, user.password);
      const token = generateAccessToken(user.id);
      if (!isValidPassword) return;
    },
    register: async (
      _parent: any,
      { username, password }: userBody,
      { prisma }: myContext
    ) => {
      if (!username || !password) return;
      const userExist = await prisma.user.findUnique({
        where: {
          username,
        },
      });
      if (userExist) return;

      const newUser = {
        username,
        password: await bcrypt.hash(password, 10),
      };
      await prisma.user.create({ data: newUser });
    },
  },
};
