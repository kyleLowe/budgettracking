import { Document, InferSchemaType, model, Schema, Types } from "mongoose";

export interface ISubcategory {
  name: string;
  note?: string;
  _id: Types.ObjectId;
}

export interface ICategory extends Document {
  name: string;
  subcategory: ISubcategory[];
  note: string;
  _id: Types.ObjectId;
}

const subcategorySchema = new Schema({
  name: { type: String, required: true },
  note: { type: String },
  _id: { type: Schema.Types.ObjectId, auto: true },
});

export const categorySchema = new Schema({
  name: { type: String, required: true },
  note: { type: String },
  subcategory: [subcategorySchema],
  _id: { type: Schema.Types.ObjectId, auto: true },
});

type Category = InferSchemaType<typeof categorySchema>;
export default model<ICategory>("Category", categorySchema);
