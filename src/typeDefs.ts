import { gql } from "apollo-server-core";

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
    email: String
  }
  type Query {
    users: [User]
  }
  type Mutation {
    login: User
    register: User
  }
`;
