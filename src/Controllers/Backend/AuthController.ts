import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../../Models/User";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../../utils";
import { Template } from "../../Models/Template";

interface IRegisterBody {
	name: string;
	company_name: string;
	phone: string;
	email: string;
	password: string;
	country_code: string;
	subdomain: string;
}

interface IEmailVerifyBody {
	email: string;
}

interface ILoginBody {
	email: string;
	password: string;
}

export async function emailVerify(req: any, reply: FastifyReply) {
	const { email } = req.body as IEmailVerifyBody;
	try {
		const user: any = await User.findOne({ email: email });
		if (user) {
			return reply
				.code(400)
				.send({ success: false, message: "Email already exists" });
		}
		return reply
			.code(200)
			.send({ success: true, message: "Email is available" });
	} catch (error) {
		return reply
			.code(500)
			.send({ success: false, message: "Server Error" });
	}
}

export async function register(req: FastifyRequest, reply: FastifyReply) {
	const body = req.body as IRegisterBody;

	const user: any = await User.create({
		...body,
		password: bcrypt.hashSync(body.password, 10),
	});
	if (user) {
		const createDefaultFields = await user.createDefaultFields();
		//delay for 2 seconds
		await new Promise((resolve) => setTimeout(resolve, 2000));
		if (createDefaultFields) {
			const createDefaultSettings = await user.createDefaultSettings();
			if (createDefaultSettings) {
				await user.createDefaultTemplate();
			}
		}
	}

	return reply.code(201).send(user);
}

export async function login(req: FastifyRequest, reply: FastifyReply) {
	const { email, password } = req.body as ILoginBody;

	try {
		const user: any = await User.findOne({ email });
		if (!user) {
			return reply
				.code(400)
				.send({ success: false, message: "User not found" });
		}
		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return reply
				.code(400)
				.send({ success: false, message: "Invalid Credentials" });
		}

		const token = jwt.sign(
			{
				id: user._id,
				email: user.email,
				user_type: user.user_type,
			},
			config.JWT_SECRET,
			{
				expiresIn: "1d",
			}
		);
		return reply.code(200).send({
			success: true,
			message: "Login Successful",
			token,
		});
	} catch (error) {
		return reply
			.code(500)
			.send({ success: false, message: "Server Error" });
	}
}

export async function me(req: any, reply: FastifyReply) {
	try {
		const user = await User.findById(req.user.id);
		if (!user) {
			return reply
				.code(400)
				.send({ success: false, message: "User not found" });
		}
		return reply.code(200).send(user);
	} catch (error) {
		return reply

			.code(500)
			.send({ success: false, message: "Server Error" });
	}
}
