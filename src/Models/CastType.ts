import { getModelForClass, prop } from "@typegoose/typegoose";

export class CastTypeModel {
	@prop({ required: true, type: String })
	public uuid!: string;
	@prop({ required: true, type: String })
	public type_name!: string;
}

export const CastType = getModelForClass(CastTypeModel, {
	schemaOptions: {
		timestamps: true,
		collection: "cast_types",
	},
});
