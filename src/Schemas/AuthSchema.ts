export const EmailVefySchema = {
	schema: {
		body: {
			type: "object",
			properties: {
				email: {
					format: "email",
					type: "string",
				},
			},
			required: ["email"],
		},
		tags: ["Auth"],
	},
};

export const RegisterSchema = {
	schema: {
		body: {
			type: "object",
			properties: {
				name: { type: "string" },
				company_name: { type: "string" },
				phone: { type: "string" },
				email: { format: "email", type: "string" },
				password: { type: "string" },
				country_code: { type: "string" },
				subdomain: { type: "string" },
			},
			required: [
				"name",
				"company_name",
				"phone",
				"email",
				"password",
				"country_code",
				"subdomain",
			],
		},
		tags: ["Auth"],
	},
};

export const LoginSchema = {
	schema: {
		body: {
			type: "object",
			properties: {
				email: { format: "email", type: "string" },
				password: { type: "string" },
			},
			required: ["email", "password"],
		},
		tags: ["Auth"],
	},
};
