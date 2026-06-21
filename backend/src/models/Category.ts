import { Document, InferSchemaType, model, Schema, Types } from "mongoose";

export interface ISubcategory{
    name: string;
    note?: string;
    subcategory: ISubcategory[];
}

export interface ICategory extends Document {
    name: string;
    subcategory: ISubcategory[];
    note: string;
}

const subcategorySchema = new Schema({
    name: { type: String, required: true },
    note: { type: String }
});

subcategorySchema.add({ subcategory: [subcategorySchema] });

export const categorySchema = new Schema({
    name: { type: String, required: true },
    note: { type: String },
    subcategory: [subcategorySchema]
});

type Category = InferSchemaType<typeof categorySchema>;
export default model<ICategory>('Category', categorySchema);