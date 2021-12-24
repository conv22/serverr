import { userBodyLogin, userBodyRegister } from "../types/auth";
import { myContext } from "../types/context";
import { generateAccessToken } from "../utils/auth";
import { validateLogin, validateRegister } from "../utils/user";
import { hashPassword } from "./../utils/auth";

export const authResolver = {
  Mutation: {
    login: async (_parent: any, body: userBodyLogin, { prisma }: myContext) => {
      if (!validateLogin(body)) return;
      const user = await prisma.user.findUnique({
        where: {
          username: body.username,
        },
      });
      if (!user) return;
      const token = generateAccessToken(user.id);
    },
    register: async (
      _parent: any,
      body: userBodyRegister,
      { prisma }: myContext
    ) => {
      if (!validateRegister(body)) return;
      const userExist = await prisma.user.findUnique({
        where: {
          username: body.username,
        },
      });
      if (userExist) return;

      const newUser = {
        username: body.username,
        password: await hashPassword(body.password),
      };
      const savedUser = await prisma.user.create({ data: newUser });
      const token = generateAccessToken(savedUser.id);
    },
  },
};
