import { config } from "../utils/config";
import { AdminPublicRoutes, AdminPrivateRoutes } from "../Routes/AdminRoute";
import { SuperAdminRoutes } from "../Routes/SuperAdminRoute";

const prefix = "/api/" + config.API_VERSION;

export default function RegisterRoutes(server: any) {
	server.setErrorHandler((error: any, request: any, reply: any) => {
		reply.code(401).send({
			success: false,
			message: error.message,
		});
	});
	//public routes for admin
	server.register(AdminPublicRoutes, { prefix: `${prefix}/` });
	//private routes for admin
	server.register(AdminPrivateRoutes, { prefix: `${prefix}/` });
	server.register(SuperAdminRoutes, { prefix: `${prefix}/admin/` });

	//admin routes

	return server;
}
