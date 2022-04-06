import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { connectDatabase } from './database';
import { typeDefs, resolvers } from './graphql';

const mount = async (app: Application) => {
	const db = await connectDatabase();
	// Apollo
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: () => ({ db }),
		plugins: [ApolloServerPluginLandingPageGraphQLPlayground]
	});

	// Need startServer() for apollo-server-express 3.x
	const startServer = async () => {
		await server.start();
		// pass in the express app and the endpoint for where our GraphQL API should live.
		server.applyMiddleware({ app, path: '/api' });
	};

	startServer();

	app.listen(process.env.PORT);

	console.log(`[app]: Ready at http://localhost:${process.env.PORT}`);
};

mount(express());
