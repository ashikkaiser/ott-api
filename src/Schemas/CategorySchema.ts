export const getCategoriesSchema = {
	schema: {
		tags: ["Category"],
		summary: "Get categories",
		description: "Get categories",
	},
};

export const createCategorySchema = {
	schema: {
		tags: ["Category"],
		summary: "Create category",
		description: "Create category",
		body: {
			type: "object",
			properties: {
				name: { type: "string" },
				parent_uuid: { type: "string" },
			},
		},
	},
};

export const updateCategorySchema = {
	schema: {
		tags: ["Category"],
		summary: "Update category",
		description: "Update category",
		body: {
			type: "object",
			properties: {
				name: { type: "string" },
				parent_uuid: { type: "string" },
				id: { type: "string" },
			},
		},
	},
};

export const deleteCategorySchema = {
	schema: {
		tags: ["Category"],
		summary: "Delete category",
		description: "Delete category",
	},
};

export const getTempaltebyIdSchema = {
	schema: {
		tags: ["Content Settings"],
		summary: "Get template by id",
		description: "Get template by id",
	},
};
