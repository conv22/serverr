import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
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
    });
    await server.start();
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
