import { Document, InferSchemaType, model, Schema } from "mongoose";

export interface ICategory extends Document {
    name: string;
    subcategory: ICategory;
    note: string;
}

export const categorySchema = new Schema({
    name: { type: String, required: true },
    subcategory: { type: Schema.Types.ObjectId, ref: 'Category' },
    note: { type: String }
});

type Category = InferSchemaType<typeof categorySchema>;
export default model<ICategory>('Category', categorySchema);