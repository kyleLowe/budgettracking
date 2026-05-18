import { Document, InferSchemaType, model, Schema } from "mongoose";

export interface ICurrency extends Document {
    code: string;
    name: string;
    symbol: string;
}

export const currencySchema = new Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    symbol: { type: String, required: true }
});

type Currency = InferSchemaType<typeof currencySchema>;
export default model<ICurrency>('Currency', currencySchema);