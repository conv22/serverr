import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const prisma = new PrismaClient();

(async () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`The server has been started on PORT ${process.env.PORT}`);
    });
  } catch (e) {
    console.log(e);
    process.exit(1);
  } finally {
    prisma.$disconnect();
  }
})();
