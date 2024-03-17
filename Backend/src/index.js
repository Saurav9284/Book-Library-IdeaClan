require('dotenv').config()
const { app } = require("./app");
const { Connection } = require("./db/db");
const  { ApolloServer } = require("apollo-server-express");
const { applyMiddleware } = require("@apollo/server/express4");
const { typeDefs, resolvers } = require("./graphql/main");
const { authentication } = require("./middleware/authentication.middleware");

const PORT = process.env.PORT;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    const user = await authentication(req, res).catch((err) => console.log(err));
    return { req, res, user };
  },
});

Connection()

  .then(async () => {
    await server.start();
    server.applyMiddleware({ app });
    app.listen(PORT, () => {
      console.log(`server is running on PORT:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Mongo DB Connection Failed", error);
  });