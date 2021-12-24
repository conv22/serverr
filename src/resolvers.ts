import { authResolver } from "./resolvers/auth";
import { userResolver } from "./resolvers/user";
export const resolvers = {
  ...userResolver,
  ...authResolver,
};
