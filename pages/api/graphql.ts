import { ApolloServer} from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import dbConnect from '../../db/mongo'

import resolvers from '../../graphql/resolvers'
import typeDefs from '../../graphql/types'
import context from '../../graphql/context'


export const config = {api: {bodyParser: false,},};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();


export default async function handler(req:any, res:any) {
  await startServer;
  await dbConnect();
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}