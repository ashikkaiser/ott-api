import { getModelForClass, prop } from "@typegoose/typegoose";
import { UserModel } from "./User";
export class PeopleModel {
	@prop({ required: true, type: String })
	public uuid!: UserModel;
	@prop({ required: true, type: String })
	public cast_name!: string;
	@prop({ required: true, type: String })
	public cast_bio!: string;
	@prop({ required: false, type: String })
	public cast_image_uuid!: string;
	@prop({ required: false, type: String })
	public cast_image_url!: string;
}

export const People = getModelForClass(PeopleModel, {
	schemaOptions: {
		timestamps: true,
		collection: "peoples",
	},
});
