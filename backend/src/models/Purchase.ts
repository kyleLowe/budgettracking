import { Document, InferSchemaType, model, Schema } from "mongoose";
import { ICurrency } from "./Currency";
import { ICategory } from "./Category";

export interface IPurchase extends Document {
    userId: string;
    amount: number;
    currency: ICurrency;
    category: ICategory;
    store: string;
    name: string;
    note: string;
    date: Date;
}

export const purchaseSchema = new Schema({
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: Schema.Types.ObjectId, ref: 'Currency', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    store: { type: String },
    name: { type: String },
    note: { type: String },
    date: { type: Date, default: Date.now }
});

type Purchase = InferSchemaType<typeof purchaseSchema>;
export default model<IPurchase>('Purchase', purchaseSchema);
