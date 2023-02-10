import envSchema from "env-schema";
import { Type, Static } from "@sinclair/typebox";
const schema = Type.Object({
	DB_URI: Type.String(),
	PORT: Type.Number(),
	API_VERSION: Type.String(),
	JWT_SECRET: Type.String(),
	HOST: Type.String(),
	SERVER: Type.String(),
});
type Env = Static<typeof schema>;
export const config: Env = envSchema({
	schema,
	dotenv: true,
});
