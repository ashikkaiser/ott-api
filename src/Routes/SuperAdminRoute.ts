import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { SuperAdminAuthMiddleware } from "../Middlewares/AuthMiddleware";
import { field } from "../Controllers/Admin/FieldController";
import {
	adminCreateFieldSchema,
	adminDeleteFieldSchema,
	adminGetFieldsSchema,
	adminUpdateFieldSchema,
} from "../Schemas/FieldSchema";
import { me } from "../Controllers/Backend/AuthController";

export async function SuperAdminRoutes(
	app: FastifyInstance,
	opts: FastifyPluginOptions,
	done: (err?: Error) => void
) {
	SuperAdminAuthMiddleware(app);

	app.post("/auth/me", {
		schema: {
			tags: ["Admin Auth"],
			summary: "Get user",
			description: "Get user",
		},

		handler: me,
	});

	app.get("fields", {
		...adminGetFieldsSchema,
		handler: field,
	});

	app.post("fields", {
		...adminCreateFieldSchema,
		handler: field,
	});

	app.put("fields", {
		...adminUpdateFieldSchema,
		handler: field,
	});

	app.delete("fields", {
		...adminDeleteFieldSchema,
		handler: field,
	});

	done();
}
