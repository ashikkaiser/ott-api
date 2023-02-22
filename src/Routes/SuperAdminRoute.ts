import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { SuperAdminAuthMiddleware } from "../Middlewares/AuthMiddleware";
import { field, systemFields } from "../Controllers/Admin/FieldController";
import {
	adminCreateFieldSchema,
	adminDeleteFieldSchema,
	adminGetFieldsSchema,
	adminUpdateFieldSchema,
} from "../Schemas/FieldSchema";
import { me } from "../Controllers/Backend/AuthController";
import {
	adminCreateTemplateSchema,
	adminDeleteTemplateSchema,
	adminGetTemplateSchema,
	adminUpdateTemplateSchema,
} from "../Schemas/TemplateSchema";
import { template } from "../Controllers/Admin/TemplateController";

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

	app.delete("fields/:id", {
		...adminDeleteFieldSchema,
		handler: field,
	});
	app.get("system_fields", {
		schema: {
			tags: ["Admin Fields"],
			summary: "Get system fields",
			description: "Get system fields",
		},
		handler: systemFields,
	});
	app.get("template", {
		...adminGetTemplateSchema,
		handler: template,
	});
	app.post("template", {
		...adminCreateTemplateSchema,
		handler: template,
	});
	app.put("template", {
		...adminUpdateTemplateSchema,
		handler: template,
	});
	app.delete("template", {
		...adminDeleteTemplateSchema,
		handler: template,
	});
	app.get("template/:id", {
		schema: {
			tags: ["Admin Template"],
			summary: "Get template",
			description: "Get template",
		},
		handler: template,
	});

	done();
}
