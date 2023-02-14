import { FastifyReply } from "fastify";
import { Template } from "../../Models/Template";

export async function template(req: any, reply: FastifyReply) {
	if (req.method === "GET") {
		try {
			const templates = await Template.find({
				is_default: true,
			});
			return reply.code(200).send({
				success: true,
				message: "Template GET",
				data: templates,
			});
		} catch (err) {
			return reply.code(500).send({
				success: false,
				message: "Something went wrong",
			});
		}
	}
	if (req.method === "POST") {
		try {
			const { name, content_type, image_setting, trans } = req.body;

			await Template.create({
				uuid: req.user.id,
				name,
				content_type,
				image_setting,
				trans: trans.map((item: any, key: number) => ({
					field_uuid: item.field_uuid,
					field_order: key + 1,
					field_name: item.field_name,
				})),
				is_default: true,
				system: true,
			});

			return reply.code(200).send({
				success: true,
				message: "Template Created Successfully",
			});
		} catch (err) {
			console.log(err);
			return reply.code(500).send({
				success: false,
				message: "Something went wrong",
			});
		}
	}
	if (req.method === "PUT") {
		const { name, content_type, image_setting, trans } = req.body;

		await Template.updateOne(
			{ _id: req.params.id },
			{
				name,
				content_type,
				image_setting,
				trans: trans.map((item: any, key: number) => ({
					field_uuid: item.field_uuid,
					field_order: key + 1,
					field_name: item.field_name,
				})),
				is_default: true,
				system: true,
			}
		);

		return reply.code(200).send({
			success: true,
			message: "Template PUT",
		});
	}
	if (req.method === "DELETE") {
		return reply.code(200).send({
			success: true,
			message: "Template DELETE",
		});
	}
}
