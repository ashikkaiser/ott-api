import { FastifyReply, FastifyRequest } from "fastify";
import { Field } from "../../Models/Field";

export async function field(req: any, reply: FastifyReply) {
	const { user } = req;
	if (req.method === "GET") {
		try {
			const fields = await Field.find();

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
			const {
				field_name,
				unique_key,
				field_type,
				option_list,
				access_type,
				relation_table,
			} = req.body;
			await Field.create({
				access_type,
				field_name,
				field_alias: field_name,
				unique_key,
				field_type,
				option_list,
				relation_table,
				is_system: true,
			});
			return reply.code(200).send({
				success: true,
				message: "Field created successfullys",
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
		try {
			const {
				id,
				field_name,
				unique_key,
				field_type,
				option_list,
				access_type,
				relation_table,
			} = req.body;
			await Field.updateOne(
				{
					_id: id,
				},
				{
					access_type,
					field_alias: field_name,
					unique_key,
					field_type,
					option_list,
					relation_table,
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
				_id: req.params.id,
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

export async function systemFields(req: any, reply: FastifyReply) {
	if (req.method === "GET") {
		try {
			const fields = await Field.find({
				is_system: true,
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
}
