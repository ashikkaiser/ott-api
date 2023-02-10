import { config } from "./config";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

export default async function RegisteredPlugin(server: any) {
	server.register(require("@fastify/jwt"), {
		formatUser: function (user: any) {
			return {
				id: user?.id,
				email: user?.email,
				user_type: user?.user_type,
			};
		},
		secret: config.JWT_SECRET,
	});

	server.register(cors, {
		origin: "*",
		methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
		preflightContinue: false,
		optionsSuccessStatus: 204,
	});
	await server.register(fastifySwagger, {
		mode: "dynamic",
		openapi: {
			info: {
				title: "OTT API",
				description: "OTT API",
				version: "1.0",
			},

			servers: [
				{
					url:
						config.SERVER === "dev"
							? `http://${config.HOST}:${config.PORT}/api/${config.API_VERSION}`
							: `https://api.staging.eflix.com.bd/api/${config.API_VERSION}`,
					description: "Staging Server",
				},
			],
			components: {
				securitySchemes: {
					bearerAuth: {
						type: "http",
						scheme: "bearer",
						bearerFormat: "JWT",
					},
				},
			},
			security: [
				{
					bearerAuth: [],
				},
			],
			// security: [Object],
			// tags: [Object]
		},
	});
	await server.register(fastifySwaggerUi, {
		routePrefix: "/api/" + config.API_VERSION + "/doc",

		initOAuth: {},
		uiConfig: {
			docExpansion: "NONE",
			deepLinking: false,
			filter: true,
			layout: "BaseLayout",
			persistAuthorization: true,
			// displayOperationId: true,
			syntaxHighlight: {
				activate: true,
				theme: "darkula",
			},
		},
		uiHooks: {
			onRequest: function (request: any, reply: any, next: any) {
				next();
			},
			preHandler: function (request: any, reply: any, next: any) {
				next();
			},
		},
		staticCSP: false,
		transformStaticCSP: (header: any) => header,
		exposeRoute: true,
	});

	return server;
}
