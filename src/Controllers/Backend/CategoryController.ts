import { FastifyReply, FastifyRequest } from "fastify";
import { Category } from "../../Models/Category";

export async function category(req: any, reply: FastifyReply) {
	const { user } = req;
	if (req.method === "GET") {
		try {
			const categories = await Category.find({
				uuid: user.id,
			});

			return reply.code(200).send({
				success: true,
				data: categories,
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
			const { name, parent_uuid } = req.body;
			await Category.create({
				uuid: user.id,
				name,
				parent_uuid,
			});
			return reply.code(200).send({
				success: true,
				message: "Content settings created successfully",
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
			const { name, parent_uuid, id } = req.body;
			await Category.updateOne({
				uuid: user.id,
				_id: id,
				name,
				parent_uuid,
			});
			return reply.code(200).send({
				success: true,
				message: "Content settings created successfully",
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
			const { id } = req.body;
			await Category.deleteOne({
				uuid: user.id,
				_id: id,
			});
			return reply.code(200).send({
				success: true,
				message: "Content settings created successfully",
			});
		} catch (err) {
			return reply.code(500).send({
				success: false,
				message: "Something went wrong",
			});
		}
	}
}
