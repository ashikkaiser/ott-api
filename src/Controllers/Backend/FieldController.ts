import { FastifyReply, FastifyRequest } from "fastify";
import { Field } from "../../Models/Field";

export async function field(req: any, reply: FastifyReply) {
	const { user } = req;
	if (req.method === "GET") {
		try {
			const fields = await Field.find({
				uuid: user.id,
			});

			return reply.code(200).send({
				success: true,
				data: fields,
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
			const { field_name, unique_key, field_type, option_list } =
				req.body;
			await Field.create({
				uuid: user.id,
				field_name,
				unique_key,
				field_type,
				option_list,
			});
			return reply.code(200).send({
				success: true,
				message: "Field created successfully",
			});
		} catch (err) {
			return reply.code(500).send({
				success: false,
				message: "Something went wrong",
			});
		}
	}
	if (req.method === "PUT") {
		try {
			const { id, field_name, unique_key, field_type, option_list } =
				req.body;
			await Field.updateOne(
				{
					_id: id,
					uuid: user.id,
				},
				{
					field_name,
					unique_key,
					field_type,
					option_list,
				}
			);

			return reply.code(200).send({
				success: true,
				message: "Field updated successfully",
			});
		} catch (err) {
			return reply.code(500).send({
				success: false,
				message: "Something went wrong",
			});
		}
	}
	if (req.method === "DELETE") {
		try {
			await Field.deleteOne({
				_id: req.body.id,
				uuid: user.id,
			});
			return reply.code(200).send({
				success: true,
				message: "Field deleted successfully",
			});
		} catch (err) {
			return reply.code(500).send({
				success: false,
				message: "Something went wrong",
			});
		}
	}
}
