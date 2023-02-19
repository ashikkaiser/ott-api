import { getModelForClass, prop } from "@typegoose/typegoose";
import { UserModel } from "./User";

export class CategoryModel {
	@prop({ required: true, type: String })
	public uuid!: UserModel;
	@prop({ required: true, type: String })
	public name!: string;
	@prop({ required: false, type: String })
	public parent_uuid!: string;
}

export const Category = getModelForClass(CategoryModel, {
	schemaOptions: {
		timestamps: true,
		collection: "categories",
	},
});
