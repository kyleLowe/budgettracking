import { Schema } from "mongoose";
import { IPurchase } from "./Purchase";

export enum SubscriptionFrequency {
    DAILY = "daily",
    WEEKLY = "weekly",
    BIWEEKLY = "biweekly",
    MONTHLY = "monthly",
    QUARTERLY = "quarterly",
    YEARLY = "yearly",
}

export interface ISubscription extends IPurchase {
    frequency: SubscriptionFrequency;
}

export const subscriptionSchema = new Schema({
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: Schema.Types.ObjectId, ref: 'Currency', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    store: { type: String, required: true },
    name: { type: String, required: true },
    note: { type: String },
    date: { type: Date, required: true },
    frequency: { type: String, enum: Object.values(SubscriptionFrequency), required: true },
});