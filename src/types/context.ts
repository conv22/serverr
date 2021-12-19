import { PrismaClient } from "@prisma/client";
import { ExpressContext } from "apollo-server-express";

export type myContext = ExpressContext & { prisma: PrismaClient };
