import { FastifyReply } from "fastify";
import { Library } from "../../Models/Library";

export const library = async (req: any, reply: FastifyReply) => {
	const { user } = req;
	if (req.method === "GET") {
		try {
			const library = await Library.find({
				uuid: user.id,
				file_type: req.query.type,
			});

			return reply.code(200).send({
				success: true,
				data: library,
			});
		} catch (err) {
			return reply.code(500).send({
				success: false,
				message: "Something went wrong",
			});
		}
	}
};

export async function saveAsset(req: any, reply: FastifyReply) {
	const { user } = req;
	try {
		const {
			file_name,
			file_url,
			file_type,
			file_size,
			content_type,
			duration,
			resolution,
			video_bitrate,
			audio_bitrate,
			frame_rate,
			bit_rate,
			encoding_status,
			image_height,
			image_width,
			is_cropped,
		} = req.body;
		await Library.create({
			uuid: user.id,
			file_name,
			file_url,
			file_type,
			file_size,
			content_type,
			duration,
			resolution,
			video_bitrate,
			audio_bitrate,
			frame_rate,
			bit_rate,
			encoding_status,
			image_height,
			image_width,
			is_cropped,
		});
		return reply.code(200).send({
			success: true,
			message: "Asset saved successfully",
		});
	} catch (err) {
		return reply.code(500).send({
			success: false,
			message: "Something went wrong",
		});
	}
}
