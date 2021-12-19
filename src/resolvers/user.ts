import { myContext } from "./../types/context";
export const userResolver = {
  Query: {
    users: async (_parent: any, _args: any, { prisma }: myContext) => {
      const users = await prisma.user.findMany();
      return users;
    },
  },
};
