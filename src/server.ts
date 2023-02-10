import { fastify } from "fastify";
import { config } from "./utils/config";
import { connectDB } from "./utils/db";
import RegisterRoutes from "./utils/registerRoutes";
import RegisteredPlugin from "./utils/registerPlugns";
const fs = require("fs");
//routes

export const server = async () => {
	const server = fastify({
		logger: false,
		// https: {
		// 	key: fs.readFileSync("certs/server.key"),
		// 	cert: fs.readFileSync("certs/server.crt"),
		// },
	});

	RegisteredPlugin(server);

	RegisterRoutes(server);

	await connectDB();

	try {
		if (config.SERVER === "dev") {
			await server.listen({
				port: config.PORT,
				host: config.HOST,
			});
		} else {
			await server.listen({
				port: config.PORT,
			});
		}

		console.log("Server started successfully");
	} catch (err) {
		console.log(err);
		server.log.error(err);
		process.exit(1);
	}

	return server;
};
