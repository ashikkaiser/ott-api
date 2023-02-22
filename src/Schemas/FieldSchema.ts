export const getFieldsSchema = {
	schema: {
		tags: ["Fields"],
		summary: "Get fields",
		description: "Get fields",
	},
};

export const createFieldSchema = {
	schema: {
		tags: ["Fields"],
		summary: "Create field",
		description: "Create field",
		body: {
			type: "object",
			properties: {
				field_name: { type: "string" },
				unique_key: { type: "string" },
				field_alias: { type: "string" },
				field_type: {
					type: "string",
					enum: ["text", "select", "textarea"],
				},
				option_list: { type: "array" },
			},
			required: ["field_name", "unique_key", "field_type"],
		},
	},
};

export const updateFieldSchema = {
	schema: {
		tags: ["Fields"],
		summary: "Update field",
		description: "Update field",
		body: {
			type: "object",
			properties: {
				id: { type: "string" },
				field_name: { type: "string" },
				unique_key: { type: "string" },
				field_alias: { type: "string" },
				field_type: {
					type: "string",
					enum: ["text", "select", "textarea"],
				},
				option_list: { type: "array" },
			},
			required: ["id", "field_name", "unique_key", "field_type"],
		},
	},
};

export const deleteFieldSchema = {
	schema: {
		tags: ["Fields"],
		summary: "Delete field",
		description: "Delete field",
		body: {
			type: "object",
			properties: {
				id: { type: "string" },
			},
		},
	},
};

export const adminGetFieldsSchema = {
	schema: {
		tags: ["Admin Fields"],
		summary: "Get fields",
		description: "Get fields",
	},
};

export const adminCreateFieldSchema = {
	schema: {
		tags: ["Admin Fields"],
		summary: "Create field",
		description: "Create field",
		body: {
			type: "object",
			properties: {
				field_name: { type: "string" },
				unique_key: { type: "string" },
				field_type: {
					type: "string",
					enum: ["text", "select", "textarea", "tag"],
				},
				option_list: { type: "array" },
				access_type: {
					type: "string",
					enum: ["SYSTEM_DEFINED", "SYSTEM_DEFINED_REMOVABLE"],
				},
				relation_table: { type: "string" },
			},
			required: ["field_name", "unique_key", "field_type"],
		},
	},
};

export const adminUpdateFieldSchema = {
	schema: {
		tags: ["Admin Fields"],
		summary: "Update field",
		description: "Update field",
		body: {
			type: "object",
			properties: {
				id: { type: "string" },
				field_name: { type: "string" },
				unique_key: { type: "string" },
				field_type: {
					type: "string",
					enum: ["text", "select", "textarea", "tag"],
				},
				option_list: { type: "array" },
				access_type: {
					type: "string",
					enum: ["SYSTEM_DEFINED", "SYSTEM_DEFINED_REMOVABLE"],
				},
				relation_table: { type: "string" },
			},
			required: ["id", "field_name", "unique_key", "field_type"],
		},
	},
};

export const adminDeleteFieldSchema = {
	schema: {
		tags: ["Admin Fields"],
		summary: "Delete field",
		description: "Delete field",
	},
};
