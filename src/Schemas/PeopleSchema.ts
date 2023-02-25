export const getPepoleSchema = {
	schema: {
		tags: ["Cast"],
		summary: "Get people",
		description: "Get people",
	},
};

export const createPeopleSchema = {
	schema: {
		body: {
			type: "object",
			properties: {
				cast_name: { type: "string" },
				cast_bio: { type: "string" },
				cast_image_uuid: { type: "string" },
			},
			required: ["cast_name", "cast_bio", "cast_image_uuid"],
		},
		tags: ["Cast"],
	},
};

export const updatePeopleSchema = {
	schema: {
		body: {
			type: "object",
			properties: {
				cast_name: { type: "string" },
				cast_bio: { type: "string" },
				cast_image_uuid: { type: "string" },
				id: { type: "string" },
			},
			required: ["cast_name", "cast_bio", "cast_image_uuid", "id"],
		},
		tags: ["Cast"],
	},
};

export const deletePeopleSchema = {
	schema: {
		tags: ["Cast"],
		body: {
			type: "object",
			properties: {
				id: { type: "string" },
			},
			required: ["id"],
		},
	},
};

export const getCastsTypeSchema = {
	schema: {
		tags: ["Cast"],
		summary: "Get people type",
		description: "Get people type",
	},
};

export const createCastTypeSchema = {
	schema: {
		body: {
			type: "object",
			properties: {
				type_name: { type: "string" },
			},
			required: ["type_name"],
		},
		tags: ["Cast"],
	},
};

export const updateCastTypeSchema = {
	schema: {
		body: {
			type: "object",
			properties: {
				type_name: { type: "string" },
				id: { type: "string" },
			},
			required: ["type_name", "id"],
		},
		tags: ["Cast"],
	},
};

export const deleteCastTypeSchema = {
	schema: {
		tags: ["Cast"],
		summary: "Delete people type",
		description: "Delete people type",
	},
};
