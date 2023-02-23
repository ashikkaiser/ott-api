import { FastifyReply, FastifyRequest } from "fastify";
import { uuid } from "uuidv4";
import { ContentSetting } from "../../Models/ContentSetting";
import { Template } from "../../Models/Template";

export async function contentSettings(req: any, reply: FastifyReply) {
	const { user } = req;
	const { type } = req.params;

	if (req.method === "GET") {
		if (type === "manage-metadata") {
			console.log("meta");
			await MetaMennagemetGet(req, reply);
		}

		try {
			const contentSettings: any = await ContentSetting.findOne({
				uuid: user.id,
			});
			if (!contentSettings) {
				return reply.code(200).send({
					success: true,
					messsage: "Content settings not found",
					data: [],
				});
			}
			return reply.code(200).send({
				success: true,
				messsage: "Content settings fetched successfully",
				data: contentSettings[type] || [],
			});
		} catch (err) {
			return reply.code(500).send({
				success: false,
				message: "Something went wrong",
			});
		}
	}

	if (req.method === "POST") {
		if (type === "level_structures") {
			await LevelStructureAdd(req, reply);
		}
	}

	if (req.method === "PUT") {
		if (type === "level_structures") {
			await LevelStructureUpdate(req, reply);
		}
	}
	if (req.method === "DELETE") {
		if (type === "level_structures") {
			await LevelStructureDelete(req, reply);
		}
	}
}

export async function template(req: any, reply: FastifyReply) {
	try {
		const { user } = req;
		const { id } = req.params;
		const template = await Template.findOne({
			_id: id,
			uuid: user.id,
		});
		if (!template) {
			return reply.code(200).send({
				success: false,
				messsage: "Template not found",
				data: [],
			});
		}
		return reply.code(200).send({
			success: true,
			messsage: "Template fetched successfully",
			data: template,
		});
	} catch (error) {
		return reply.code(500).send({
			success: false,
			message: "Something went wrong",
		});
	}
}
// Level Structure Section

async function LevelStructureAdd(req: any, reply: FastifyReply) {
	try {
		LevelStructureAdd;
		const {
			structure_name,
			allowed_level,
			display_style,
			level_structure_detail,
		} = req.body;
		const checkIFExist: any = await ContentSetting.findOne({
			uuid: req.user.id,
		});
		if (checkIFExist) {
			await ContentSetting.updateOne(
				{
					uuid: req.user.id,
				},
				{
					$push: {
						level_structures: {
							structure_name,
							allowed_level,
							display_style,
							level_structure_detail: level_structure_detail
								?.filter((item: any) => item.level_name)
								.map((item: any, index: Number) => {
									return {
										level_name: item.level_name,
										level: index,
										uuid: uuid(),
									};
								}),

							uuid: uuid(),
						},
					},
				}
			);
			return reply.code(200).send({
				success: true,
				message: "Content settings created successfully",
			});
		} else {
			await ContentSetting.create({
				uuid: req.user.id,
				$push: {
					level_structures: {
						structure_name,
						allowed_level,
						display_style,
						level_structure_detail: level_structure_detail
							?.filter((item: any) => item.level_name)
							.map((item: any, index: Number) => {
								return {
									level_name: item.level_name,
									level: index,
									uuid: uuid(),
								};
							}),

						uuid: uuid(),
					},
				},
			});
			return reply.code(200).send({
				success: true,
				message: "Content settings created successfully",
			});
		}
	} catch (err) {
		console.log(err);
		return reply.code(500).send({
			success: false,
			message: "Something went wrong",
		});
	}
}

async function LevelStructureUpdate(req: any, reply: FastifyReply) {
	try {
		const {
			uuid,
			structure_name,
			allowed_level,
			display_style,
			level_structure_detail,
		} = req.body;
		await ContentSetting.updateOne(
			{
				uuid: req.user.id,
				"level_structures.uuid": uuid,
			},
			{
				$set: {
					"level_structures.$.structure_name": structure_name,
					"level_structures.$.allowed_level": allowed_level,
					"level_structures.$.display_style": display_style,
					"level_structures.$.level_structure_detail":
						level_structure_detail
							?.filter((item: any) => item.level_name)
							.map((item: any, index: Number) => {
								return {
									level_name: item.level_name,
									level: item.level || index,
									uuid: item.uuid || uuid,
								};
							}),
					uuid: uuid(),
				},
			}
		);
		return reply.code(200).send({
			success: true,
			message: "Content settings updated successfully",
		});
	} catch (err) {
		return reply.code(500).send({
			success: false,
			message: "Something went wrong",
		});
	}
}

async function LevelStructureDelete(req: any, reply: FastifyReply) {
	try {
		const { uuid } = req.params;
		//TODO: Avoid delete if level structure is used in any content
		//TODO: Avoid delete if level structure is predefined
		//TODO: Avoid Hard delete
		await ContentSetting.updateOne(
			{
				uuid: req.user.id,
			},
			{
				$pull: {
					level_structures: {
						uuid,
					},
				},
			}
		);
		return reply.code(200).send({
			success: true,
			message: "Content settings deleted successfully",
		});
	} catch (err) {
		return reply.code(500).send({
			success: false,
			message: "Something went wrong",
		});
	}
}

async function MetaMennagemetGet(req: any, reply: FastifyReply) {
	try {
		const template = await Template.find({
			uuid: req.user.id,
		});
		console.log(template);
		return reply.code(200).send({
			success: true,
			message: "Content settings fetched successfully",
			data: template,
		});
	} catch (err) {
		return reply.code(500).send({
			success: false,
			message: "Something went wrong",
		});
	}
}
// Content Settings Section
export async function getTemplateByType(req: any, reply: FastifyReply) {
	try {
		const template = await Template.find({
			uuid: req.user.id,
			type: req.params.type,
		});
		return reply.code(200).send({
			success: true,
			message: "Template fetched successfully",
			data: template,
		});
	} catch (error) {
		return reply.code(500).send({
			success: false,
			message: "Something went wrong",
		});
	}
}
