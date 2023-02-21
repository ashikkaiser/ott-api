import { getModelForClass, prop } from "@typegoose/typegoose";
import { CONTENT_TYPE } from "../utils/GlobalType";
import { Field } from "./Field";
import { UserModel } from "./User";
enum IMAGE_TYPE {
	WEB_POSTER = "WEB_POSTER",
	WEB_BANNER = "WEB_BANNER",
	APP_POSTER = "APP_POSTER",
	APP_BANNER = "APP_BANNER",
	TV_POSTER = "TV_POSTER",
	TV_BANNER = "TV_BANNER",
}
export class TemplateModel {
	@prop({ required: true, type: String })
	public uuid!: UserModel;
	@prop({ required: true, type: String })
	public name!: string;
	@prop({ required: true, type: String })
	public content_type!: CONTENT_TYPE;
	@prop({ required: false, type: Boolean, default: false })
	public is_default!: boolean;
	@prop({ required: false, type: Boolean, default: false })
	public system!: boolean;
	@prop({ required: true, type: Object })
	public image_setting!: object;
	@prop({ required: true, type: Array })
	public trans: Array<{
		field_uuid: string;
		field_order: number;
		field_name: string;
	}>;
}

export const Template = getModelForClass(TemplateModel, {
	schemaOptions: {
		timestamps: true,
		collection: "templates",
	},
});
