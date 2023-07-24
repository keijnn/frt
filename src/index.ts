//import modules
import 'reflect-metadata';
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import cors from "cors";

//import resolvers
import { TicketResolver } from './resolvers/ticket';

const main = async () => {
  const app = express();

  app.use(cors({ origin: '*', credentials: true }));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TicketResolver],
      validate: false,
    }),
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(3000, () => {
    console.log('Server ready')
  });
};

main().catch((err) => {
  console.log(err);
});