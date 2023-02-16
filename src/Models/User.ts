import { getModelForClass, prop } from "@typegoose/typegoose";
import * as bcrypt from "bcryptjs";
import { USER_TYPE } from "../utils/GlobalType";
import { Template } from "./Template";
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
		if (getDefaultTemplates) {
			getDefaultTemplates.forEach(async (template) => {
				delete template._id;
				try {
					await Template.create({
						name: template.name,
						image_setting: template.image_setting,
						content_type: template.content_type,
						trans: template.trans,
						is_default: true,
						uuid: this._id,
						system: false,
					});
				} catch (error) {
					console.log(error);
				}
			});
		}
	}
	public async removeTemplates() {
		try {
			await Template.deleteMany({ uuid: this._id });
		} catch (error) {
			console.log(error);
		}
	}
}

export const User = getModelForClass(UserModel, {
	schemaOptions: {
		timestamps: true,
		collection: "users",
	},
});
