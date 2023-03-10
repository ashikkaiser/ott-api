import { getModelForClass, prop } from "@typegoose/typegoose";
import { UserModel } from "./User";
enum FieldType {
	TEXT = "text",
	SELECT = "select",
	TEXT_AREA = "textarea",
	TAG = "tag",
}

enum AccessType {
	USER_DEFINED = "USER_DEFINED",
	SYSTEM_DEFINED = "SYSTEM_DEFINED",
	SYSTEM_DEFINED_REMOVABLE = "SYSTEM_DEFINED_REMOVABLE",
}
export class FieldModel {
	@prop({ required: false, type: String, nullable: true })
	public uuid!: UserModel;
	@prop({
		required: false,
		type: String,
		enum: AccessType,
		default: AccessType.USER_DEFINED,
	})
	public access_type!: AccessType;
	@prop({ required: true, type: String })
	public field_name!: string;
	@prop({ required: false, type: String })
	public field_alias!: string;
	@prop({ required: true, type: String })
	public unique_key!: string;
	@prop({ required: true, type: String, enum: FieldType })
	public field_type!: FieldType;
	@prop({ required: false, type: Array })
	public option_list!: string[];
	@prop({ required: false, type: String, nullable: true })
	public relation_table!: string;
	// isSystem;
	@prop({ required: false, type: Boolean, default: false })
	public is_system!: boolean;
}

export const Field = getModelForClass(FieldModel, {
	schemaOptions: {
		timestamps: true,
		collection: "fields",
	},
});
