export const adminGetTemplateSchema = {
	schema: {
		tags: ["Admin Template"],
		summary: "Get template",
		description: "Get template",
	},
};

export const adminCreateTemplateSchema = {
	schema: {
		tags: ["Admin Template"],
		summary: "Create template",
		description: "Create template",

		body: {
			type: "object",
			properties: {
				name: { type: "string" },
				content_type: { type: "string" },
				image_setting: { type: "object" },
				trans: {
					type: "array",
					items: {
						type: "object",
						properties: {
							field_uuid: { type: "string" },
							field_order: { type: "number" },
							field_name: { type: "string" },
						},
						required: ["field_uuid", "field_order", "field_name"],
					},
				},
			},
			required: ["name", "content_type", "image_setting"],
		},
	},
};

export const adminUpdateTemplateSchema = {
	schema: {
		tags: ["Admin Template"],
		summary: "Update template",
		description: "Update template",
		body: {
			type: "object",
			properties: {
				name: { type: "string" },
				content_type: { type: "string" },
				image_setting: { type: "object" },
				trans: {
					type: "array",
					items: {
						type: "object",
						properties: {
							field_uuid: { type: "string" },
							field_order: { type: "number" },
							field_name: { type: "string" },
						},
						required: ["field_uuid", "field_order", "field_name"],
					},
				},
			},
			required: ["name", "content_type", "image_setting"],
		},
	},
};

export const adminDeleteTemplateSchema = {
	schema: {
		tags: ["Admin Template"],
		summary: "Delete template",
		description: "Delete template",
	},
};
