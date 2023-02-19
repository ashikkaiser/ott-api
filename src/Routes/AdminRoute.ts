import { FastifyInstance, FastifyPluginOptions } from "fastify";

//controllers
import {
	emailVerify,
	login,
	me,
	register,
} from "../Controllers/Backend/AuthController";
import { category } from "../Controllers/Backend/CategoryController";
import {
	contentSettings,
	template,
} from "../Controllers/Backend/ContectSettingsController";
import { field } from "../Controllers/Backend/FieldController";
import { library, saveAsset } from "../Controllers/Backend/LibraryController";
import { AdminAuthMiddleware } from "../Middlewares/AuthMiddleware";

//schemas
import {
	EmailVefySchema,
	LoginSchema,
	RegisterSchema,
} from "../Schemas/AuthSchema";
import {
	createCategorySchema,
	deleteCategorySchema,
	getCategoriesSchema,
	getTempaltebyIdSchema,
	updateCategorySchema,
} from "../Schemas/CategorySchema";
import {
	createContentSettingSchema,
	deleteContentSettingSchema,
	getContentSettingSchema,
	updateContentSettingSchema,
} from "../Schemas/ContentSettingSchema";
import {
	createFieldSchema,
	deleteFieldSchema,
	getFieldsSchema,
	updateFieldSchema,
} from "../Schemas/FieldSchema";

export async function AdminPublicRoutes(
	app: FastifyInstance,
	opts: FastifyPluginOptions,
	done: (err?: Error) => void
) {
	app.get("healthCheck", {
		schema: {
			tags: ["Health"],
			summary: "Health check",
			description: "Health check",
		},
		handler: async (req, res) => {
			res.send({ status: "ok" });
		},
	});
	app.post("/auth/emailVerify", {
		...EmailVefySchema,
		handler: emailVerify,
	});
	app.post("/auth/register", {
		...RegisterSchema,
		handler: register,
	});
	app.post("/auth/login", {
		...LoginSchema,
		handler: login,
	});

	done();
}

export async function AdminPrivateRoutes(
	app: FastifyInstance,
	opts: FastifyPluginOptions,
	done: (err?: Error) => void
) {
	AdminAuthMiddleware(app);
	//auth
	app.post("/auth/me", {
		schema: {
			tags: ["Auth"],
			summary: "Get user",
			description: "Get user",
		},

		handler: me,
	});

	//Content Settings

	app.get("content/content-setting/:type", {
		...getContentSettingSchema,
		handler: contentSettings,
	});
	app.post("content/content-setting/:type", {
		...createContentSettingSchema,
		handler: contentSettings,
	});
	app.put("content/content-setting/:type", {
		...updateContentSettingSchema,
		handler: contentSettings,
	});
	app.delete("content/content-setting/:type/:uuid", {
		...deleteContentSettingSchema,
		handler: contentSettings,
	});

	//Field Settings
	app.get("field", {
		...getFieldsSchema,
		handler: field,
	});
	app.post("field", {
		...createFieldSchema,
		handler: field,
	});
	app.put("field", {
		...updateFieldSchema,
		handler: field,
	});
	app.delete("field", {
		...deleteFieldSchema,
		handler: field,
	});

	//Category
	app.get("content/category", {
		...getCategoriesSchema,
		handler: category,
	});
	app.post("content/category", {
		...createCategorySchema,
		handler: category,
	});
	app.put("content/category", {
		...updateCategorySchema,
		handler: category,
	});
	app.delete("content/category/:id", {
		...deleteCategorySchema,
		handler: category,
	});

	app.get("content/template/:id", {
		...getTempaltebyIdSchema,
		handler: template,
	});

	app.post("library/save-asset", {
		schema: {
			tags: ["Content Settings"],
			summary: "Create template",
			description: "Create template",
		},
		handler: saveAsset,
	});

	app.get("library", {
		handler: library,
	});

	done();
}
