import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { schema } from './graphql';

// Express
const app = express();
const port = 9000;

// Apollo
const server = new ApolloServer({
	schema,
	plugins: [ApolloServerPluginLandingPageGraphQLPlayground]
});

// Need startServer() for apollo-server-express 3.x
const startServer = async () => {
	await server.start();
	// pass in the express app and the endpoint for where our GraphQL API should live.
	server.applyMiddleware({ app, path: '/api' });
};

startServer();

app.listen(port);

console.log(`[app]: Ready at http://localhost:${port}`);
