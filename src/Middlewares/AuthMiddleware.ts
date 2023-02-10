import { USER_TYPE } from "../utils/GlobalType";

export async function AdminAuthMiddleware(app: any) {
	return app.addHook("onRequest", async (request: any, reply: any) => {
		try {
			const user = await request.jwtVerify();
			if (user.user_type !== USER_TYPE.ADMIN) {
				reply.code(401).send({
					success: false,
					message: "You are not authorized",
				});
			}
		} catch (err) {
			reply.code(401).send({
				success: false,
				message: "You are not authorized",
			});
		}
	});
}

export async function SuperAdminAuthMiddleware(app: any) {
	return app.addHook("onRequest", async (request: any, reply: any) => {
		try {
			const user = await request.jwtVerify();
			if (user.user_type !== USER_TYPE.SUPER_ADMIN) {
				reply.code(401).send({
					success: false,
					message: "You are not authorized",
				});
			}
		} catch (err) {
			reply.code(401).send({
				success: false,
				message: "You are not authorized",
			});
		}
	});
}

export async function AuthUserMiddleware(app: any) {
	return app.addHook("onRequest", async (request: any, reply: any) => {
		try {
			const user = await request.jwtVerify();
			if (user.role !== "admin") {
				reply.code(401).send({ message: "You are not authorized" });
			}
		} catch (err) {
			reply.code(401).send({ message: "You are not authorized" });
		}
	});
}
