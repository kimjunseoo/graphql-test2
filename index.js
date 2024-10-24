const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { json } = require("body-parser");

const app = express();
const port = 8082;

const typeDefs = `
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello, world!",
  },
};

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers, introspectio: true });
  await server.start();

  // ApolloServer를 Express에 미들웨어로 추가
  app.use("/graphql", json(), expressMiddleware(server));

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/graphql`);
  });
}

startServer();
