import { Types } from "mongoose";
import Subscription, { SubscriptionFrequency } from "../models/Subscription";
import { ISubscription } from "../models/Subscription";

export const getSubscriptionByID = async (_subscriptionID: Types.ObjectId) => {
  const subscription = await Subscription.findById(_subscriptionID);
  return subscription;
};

export const getSubscriptionsByUserID = async (_userID: Types.ObjectId) => {
  const subscriptions = await Subscription.find({ userId: _userID.toString() });
  return subscriptions;
};

export const createSubscription = async (
  _userId: Types.ObjectId,
  amount: number,
  currency: string,
  category: Types.ObjectId,
  store: string,
  name: string,
  note: string,
  frequency: SubscriptionFrequency,
  paymentMethod: string,
  date: Date,
  enabled: boolean,
) => {
  const subscription = new Subscription({
    userId: _userId,
    amount: amount,
    currency: currency,
    category: category,
    store: store,
    name: name,
    note: note,
    frequency: frequency,
    paymentMethod: paymentMethod,
    date: date,
    enabled: enabled,
  });
  await subscription.save();
  return subscription;
};

export const deleteSubscription = async (_subscriptionID: Types.ObjectId) => {
  const subscription = await Subscription.findByIdAndDelete(_subscriptionID);
  return subscription;
};

export const updateSubscription = async (
  _subscriptionID: Types.ObjectId,
  _userId: Types.ObjectId,
  amount: number,
  currency: string,
  category: Types.ObjectId,
  store: string,
  name: string,
  note: string,
  frequency: SubscriptionFrequency,
  paymentMethod: string,
  date: Date,
  enabled: boolean,
) => {
  const subscription = await Subscription.findByIdAndUpdate(
    _subscriptionID,
    {
      userId: _userId,
      amount: amount,
      currency: currency,
      category: category,
      store: store,
      name: name,
      note: note,
      frequency: frequency,
      paymentMethod: paymentMethod,
      date: date,
      enabled: enabled,
    },
    { new: true },
  );
  return subscription;
};
