import { mongoose } from "@typegoose/typegoose";
import { FastifyReply, FastifyRequest } from "fastify";
import { Category } from "../../Models/Category";

export async function category(req: any, reply: FastifyReply) {
	const { user } = req;
	if (req.method === "GET") {
		try {
			const categories: any = await Category.find({
				uuid: user.id,
				parent_uuid: null,
			});
			const categoryWithSubcategory = await Promise.all(
				categories.map(async (category: any) => {
					const children: any = await Category.find({
						uuid: user.id,
						parent_uuid: category._id,
					});
					return {
						...category._doc,
						children,
					};
				})
			);

			return reply.code(200).send({
				success: true,
				data: categoryWithSubcategory,
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
				message: "Category created successfully",
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
			await Category.updateOne(
				{
					uuid: user.id,
					_id: id,
				},
				{
					name,
					parent_uuid,
				}
			);

			return reply.code(200).send({
				success: true,
				message: "Category updated successfully",
			});
		} catch (err) {
			console.log(err);
			return reply.code(500).send({
				success: false,
				message: "Something went wrong",
			});
		}
	}
	if (req.method === "DELETE") {
		try {
			await Category.deleteOne({
				uuid: user.id,
				_id: req.params.id,
			});
			return reply.code(200).send({
				success: true,
				message: "Category deleted successfully",
			});
		} catch (err) {
			return reply.code(500).send({
				success: false,
				message: "Something went wrong",
			});
		}
	}
}
