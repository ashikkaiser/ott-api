import { getModelForClass, prop } from "@typegoose/typegoose";
import * as bcrypt from "bcryptjs";
import { USER_TYPE } from "../utils/GlobalType";
import { Field } from "./Field";
import { Template } from "./Template";
import { uuid } from "uuidv4";

import ContentSettingsData from "./seeds/content_settings.json";
import { ContentSetting } from "./ContentSetting";

export class UserModel {
	@prop({ required: true, type: String })
	public name!: string;

	@prop({ required: true, type: String, unique: true })
	public email!: string;

	@prop({ required: true, type: String })
	public password!: string;

	@prop({ required: true, type: String })
	public phone!: string;

	@prop({ required: true, type: String })
	public company_name!: string;

	@prop({ required: false, type: String })
	public location!: string;

	@prop({ required: false, type: String })
	public ip_address!: string;

	@prop({ required: false, type: String })
	public address!: string;

	@prop({ required: false, type: String })
	public profile_image_url!: string;

	@prop({ required: true, type: Boolean, default: true })
	public is_active!: boolean;

	@prop({ required: true, type: String })
	public country_code!: string;

	@prop({ required: false, type: String })
	public country_name!: string;

	@prop({ required: false, type: String })
	public region_name!: string;

	@prop({ required: false, type: String })
	public city_name!: string;

	@prop({ required: false, type: String })
	public zip_code!: string;

	@prop({ required: true, type: String })
	public subdomain!: string;

	@prop({
		required: false,
		type: String,
		enum: USER_TYPE,
		default: USER_TYPE.ADMIN,
	})
	public user_type!: USER_TYPE;
	private _id: any;

	public comparePassword(password: string) {
		return bcrypt.compare(password, this.password);
	}

	public async createDefaultTemplate() {
		const getDefaultTemplates = await Template.find({
			system: true,
		});

		const allFields: any = await Field.find({ uuid: this._id });

		if (getDefaultTemplates) {
			getDefaultTemplates.forEach(async (template) => {
				delete template?._id;
				try {
					await Template.create({
						name: template.name,
						image_setting: template.image_setting,
						content_type: template.content_type,
						trans: template.trans.map((item: any, key: number) => {
							const fild_uuid = allFields.find(
								(field: any) =>
									field.field_name.toLowerCase().trim() ===
									item.field_name.toLowerCase().trim()
							);
							if (!fild_uuid) {
								console.log(item.field_name);
							}
							return {
								field_uuid: fild_uuid?._id,
								field_order: key + 1,
								field_name: item.field_name,
								field_alias:
									item.field_alias || item.field_name,
							};
						}),
						is_default: true,
						uuid: this._id,
						system: false,
					});
				} catch (error) {
					console.log(error);
				}
			});
		}
		return true;
	}
	// public async removeTemplates() {
	// 	try {
	// 		await Template.deleteMany({ uuid: this._id });
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }

	public async createDefaultFields() {
		const fields = await Field.find({
			is_system: true,
		});
		fields.forEach(async (field) => {
			delete field._id;
			await Field.create({
				access_type: field.access_type,
				field_name: field.field_name,
				field_alias: field?.field_alias || field.field_name,
				unique_key: field.unique_key,
				field_type: field.field_type,
				option_list: field.option_list,
				relation_table: field.relation_table,
				system: false,
				uuid: this._id,
			});
		});

		return true;
	}

	public async createDefaultSettings() {
		const data: any = ContentSettingsData;
		ContentSetting.create({
			uuid: this._id || uuid(),
			level_structures: data.level_structures.map((lvlData: any) => ({
				structure_name: lvlData.structure_name,
				allowed_level: lvlData.allowed_level,
				display_style: lvlData.display_style,
				level_structure_detail: lvlData.level_structure_detail.map(
					(lvlDetail: any) => ({
						level_name: lvlDetail.level_name,
						level: lvlDetail.level,
						level_uuid: uuid(),
					})
				),
			})),
		});

		return true;
	}
	public findByEmail(email: string) {
		this.email = email;
		return this;
	}
}

export const User = getModelForClass(UserModel, {
	schemaOptions: {
		timestamps: true,
		collection: "users",
	},
});
