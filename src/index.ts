import { PrismaClient } from "@prisma/client";
import { ApolloError, ApolloServer } from "apollo-server-express";
import express from "express";
import { GraphQLError } from "graphql";
import { authMiddleWare } from "./middleware/authMiddleware";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import { CustomError } from "./types/error";
const app = express();
const prisma = new PrismaClient();

(async () => {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req, res }) => ({
        req,
        res,
        prisma,
      }),
      formatError: (error: GraphQLError) => {
        return error.originalError instanceof ApolloError
          ? error
          : new GraphQLError(error.message);
      },
    });
    await server.start();
    app.use(authMiddleWare);
    server.applyMiddleware({ app });

    app.listen(process.env.PORT, () => {
      console.log(`The server has been started on PORT ${process.env.PORT}`);
    });
  } catch (e) {
    console.log(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
