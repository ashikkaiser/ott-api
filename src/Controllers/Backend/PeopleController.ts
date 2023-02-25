import { FastifyReply } from "fastify";
import { CastType } from "../../Models/CastType";
import { People } from "../../Models/People";

export async function cast(req: any, reply: FastifyReply) {
	if (req.method === "GET") {
		const peoples = await People.find({
			uuid: req.user.id,
		});
		return reply.code(200).send({
			success: true,
			data: peoples,
		});
	}
	if (req.method === "POST") {
		const { cast_name, cast_bio, cast_image_uuid, cast_image_url } =
			req.body;
		await People.create({
			uuid: req.user.id,
			cast_name,
			cast_bio,
			cast_image_uuid,
			cast_image_url,
		});
		return reply.code(200).send({
			success: true,
			message: "People created successfully",
		});
	}
	if (req.method === "PUT") {
		const { cast_name, cast_bio, cast_image_uuid, cast_image_url, id } =
			req.body;
		await People.updateOne(
			{
				uuid: req.user.id,
				_id: id,
			},
			{
				cast_name,
				cast_bio,
				cast_image_uuid,
				cast_image_url,
			}
		);
		return reply.code(200).send({
			success: true,
			message: "People updated successfully",
		});
	}
	if (req.method === "DELETE") {
		const { id } = req.body;
		await People.deleteOne({
			uuid: req.user.id,
			_id: id,
		});
		return reply.code(200).send({
			success: true,
			message: "People deleted successfully",
		});
	}
}

export async function castType(req: any, reply: FastifyReply) {
	if (req.method === "GET") {
		const types = await CastType.find({
			uuid: req.user.id,
		});
		return reply.code(200).send({
			success: true,
			data: types,
		});
	}
	if (req.method === "POST") {
		const { type_name } = req.body;
		await CastType.create({
			uuid: req.user.id,
			type_name,
		});
		return reply.code(200).send({
			success: true,
			message: "Cast type created successfully",
		});
	}
	if (req.method === "PUT") {
		const { type_name, id } = req.body;
		await CastType.updateOne(
			{
				uuid: req.user.id,
				_id: id,
			},
			{
				type_name,
			}
		);
		return reply.code(200).send({
			success: true,
			message: "Cast type updated successfully",
		});
	}
	if (req.method === "DELETE") {
		const { id } = req.body;
		await CastType.deleteOne({
			uuid: req.user.id,
			_id: id,
		});
		return reply.code(200).send({
			success: true,
			message: "Cast type deleted successfully",
		});
	}
}
