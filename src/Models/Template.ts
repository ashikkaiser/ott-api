import { getModelForClass, prop } from "@typegoose/typegoose";
import { CONTENT_TYPE } from "../utils/GlobalType";
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
	@prop({ required: false, type: Boolean, default: true })
	public is_default!: boolean;
	@prop({ required: true, type: Array })
	public image_setting!: Array<{
		image_type: IMAGE_TYPE;
		width: number;
		height: number;
	}>;
	@prop({ required: true, type: Array })
	public trans!: Array<{
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
