import { getModelForClass, prop } from "@typegoose/typegoose";

export class LibraryModel {
	@prop({ required: true, type: String })
	public uuid!: string;
	@prop({ required: true, type: String })
	public file_name!: string;
	@prop({ required: true, type: String })
	public file_url!: string;
	@prop({ required: true, type: String })
	public file_type!: string;
	@prop({ required: true, type: String })
	public file_size!: number;
	@prop({ required: false, type: String, nullable: true })
	public duration!: string;
	@prop({ required: false, type: String, nullable: true })
	public resolution!: string;
	@prop({ required: false, type: String, nullable: true })
	public video_bitrate!: number;
	@prop({ required: false, type: String, nullable: true })
	public audio_bitrate!: number;
	@prop({ required: false, type: String, nullable: true })
	public frame_rate!: number;
	@prop({ required: false, type: String, nullable: true })
	public bit_rate!: number;
	@prop({ required: false, type: String, nullable: true })
	public encoding_status!: string;
	@prop({ required: false, type: String, nullable: true })
	public image_height!: string;
	@prop({ required: false, type: String, nullable: true })
	public image_width!: string;
	@prop({ required: false, type: Boolean, nullable: true })
	public is_cropped!: boolean;
}

export const Library = getModelForClass(LibraryModel, {
	schemaOptions: {
		timestamps: true,
		collection: "library",
	},
});
