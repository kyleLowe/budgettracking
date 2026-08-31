import { Document, InferSchemaType, model, Schema } from "mongoose";
import { ICategory } from "./Category";

export enum paymentType {
  Purchase = "Purchase",
  Income = "Income",
}

export interface ITransaction extends Document {
  userId: string;
  amount: number;
  currency: string;
  category: ICategory;
  paymentMethod: string;
  store: string;
  name: string;
  note?: string;
  paymentType: paymentType;
  date: Date;
}

export const transactionSchema = new Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  paymentMethod: { type: String, required: true },
  store: { type: String, required: true },
  name: { type: String, required: true },
  note: { type: String },
  paymentType: {
    type: String,
    enum: Object.values(paymentType),
    required: true,
  },
  date: { type: Date, default: Date.now },
});

type Transaction = InferSchemaType<typeof transactionSchema>;
export default model<ITransaction>("Transaction", transactionSchema);
