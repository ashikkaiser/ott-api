export const getContentSettingSchema = {
	schema: {
		tags: ["Content Settings"],
		params: {
			type: "object",
			properties: {
				type: {
					type: "string",
					enum: [
						"geo-restriction",
						"content-order",
						"manage-metadata",
						"advanced",
						"level_structures",
					],
				},
			},
		},
	},
};

export const createContentSettingSchema = {
	schema: {
		body: {
			oneOf: [
				{
					type: "object",
					properties: {
						structure_name: { type: "string" },
						allowed_level: {
							type: "number",
							enum: [2, 3],
							description:
								"2 and 3 are the only allowed values for this field",
						},
						display_style: {
							type: "string",
							enum: [
								"DISPLAY_STYLE_SEPARATE",
								"DISPLAY_STYLE_HEADING",
								"DISPLAY_STYLE_TAB",
								"DISPLAY_STYLE_DROPDOWN",
							],
						},
						level_structure_detail: {
							type: "array",
							items: {
								type: "object",
								properties: {
									level_name: { type: "string" },
								},
							},
						},
					},
					required: [
						"structure_name",
						"allowed_level",
						"level_structure_detail",
					],
				},
			],
		},
		tags: ["Content Settings"],
	},
};

export const updateContentSettingSchema = {
	schema: {
		body: {
			oneOf: [
				{
					type: "object",
					properties: {
						uuid: { type: "string" },
						structure_name: { type: "string" },
						allowed_level: { type: "number" },
						display_style: { type: "string" },
						level_structure_detail: {
							type: "array",
							items: {
								type: "object",
								properties: {
									level_name: { type: "string" },
									level: { type: "number" },
									uuid: { type: "string" },
								},
							},
						},
					},
					required: [
						"structure_name",
						"allowed_level",
						"level_structure_detail",
					],
				},
				{
					type: "object",
					properties: {
						id: { type: "string" },
						geo_restriction: {
							type: "array",
							items: {
								type: "object",
								properties: {
									country: { type: "string" },
									uuid: { type: "string" },
								},
							},
						},
					},
					required: ["id", "geo_restriction"],
				},
				{
					type: "object",
					properties: {
						id: { type: "string" },
						content_order: {
							type: "array",
							items: {
								type: "object",
								properties: {
									content_type: { type: "string" },
									uuid: { type: "string" },
								},
							},
						},
					},
					required: ["id", "content_order"],
				},
				{
					type: "object",
					properties: {
						id: { type: "string" },
						manage_metadata: {
							type: "array",
							items: {
								type: "object",
								properties: {
									metadata: { type: "string" },
									uuid: { type: "string" },
								},
							},
						},
					},
					required: ["id", "manage_metadata"],
				},
				{
					type: "object",
					properties: {
						id: { type: "string" },
						advanced: {
							type: "array",
							items: {
								type: "object",
								properties: {
									advanced: { type: "string" },
									uuid: { type: "string" },
								},
							},
						},
					},
					required: ["id", "advanced"],
				},
			],
		},
		tags: ["Content Settings"],
	},
};

export const deleteContentSettingSchema = {
	schema: {
		params: {
			type: "object",
			properties: {
				id: { type: "string" },
			},
		},
		tags: ["Content Settings"],
	},
};
