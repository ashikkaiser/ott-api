import { getModelForClass, prop } from "@typegoose/typegoose";
import { UserModel } from "./User";
enum DisplayStyleEnum {
	SEPARETE_PAGE = "DISPLAY_STYLE_SEPARATE",
	HEADING = "DISPLAY_STYLE_HEADING",
	TAB = "DISPLAY_STYLE_TAB",
	DROPDOWN = "DISPLAY_STYLE_DROPDOWN",
}

interface LevelStructureDetail {
	level_name: string;
	level: number;
	uuid: string;
}

export class ContentSettingModel {
	@prop({ required: true, type: String })
	public uuid!: string;

	@prop({ required: true, type: Array })
	public level_structures!: [
		{
			structure_name: string;
			allowed_level: number;
			display_style: DisplayStyleEnum;
			level_structure_detail: LevelStructureDetail[];
			is_predefined: boolean | false;
			is_deleted: boolean | false;
		}
	];

	// @prop({ required: true, type: String, unique: true })
	// public structure_name!: string;
	// @prop({ required: true, type: Number })
	// public allowed_level!: number;
	// @prop({
	// 	required: true,
	// 	type: String,
	// 	enum: DisplayStyleEnum,
	// 	default: DisplayStyleEnum.SEPARETE_PAGE,
	// })
	// public display_style!: DisplayStyleEnum;
	// @prop({ required: true, type: Array })
	// public level_structure_detail!: LevelStructureDetail[];
	// @prop({ required: true, type: Boolean, default: false })
	// public is_predefined!: boolean;
	// @prop({ required: true, type: Boolean, default: false })
	// public is_deleted!: boolean;
}

export const ContentSetting = getModelForClass(ContentSettingModel, {
	schemaOptions: {
		timestamps: true,
		collection: "content_settings",
	},
});
