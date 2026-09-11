import { Types } from "mongoose";
import { NotAcceptableError } from "../errors/NotAcceptable";
import * as SubscriptionDAO from "../daos/SubscriptionDAO";
import { SubscriptionFrequency } from "../models/Subscription";

export const getSubscriptionByID = async (_subscriptionID: Types.ObjectId) => {
  const subscription =
    await SubscriptionDAO.getSubscriptionByID(_subscriptionID);
  return subscription;
};

export const getSubscriptionsByUserID = async (_userID: Types.ObjectId) => {
  const subscriptions = await SubscriptionDAO.getSubscriptionsByUserID(_userID);
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
  if (amount <= 0) {
    throw new NotAcceptableError("Amount must be greater than zero");
  }
  const subscription = await SubscriptionDAO.createSubscription(
    _userId,
    amount,
    currency,
    category,
    store,
    name,
    note,
    frequency,
    paymentMethod,
    date,
    enabled,
  );
  return subscription;
};

export const deleteSubscription = async (_subscriptionID: Types.ObjectId) => {
  const subscription =
    await SubscriptionDAO.deleteSubscription(_subscriptionID);
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
  if (amount <= 0) {
    throw new NotAcceptableError("Amount must be greater than zero");
  }
  const subscription = await SubscriptionDAO.updateSubscription(
    _subscriptionID,
    _userId,
    amount,
    currency,
    category,
    store,
    name,
    note,
    frequency,
    paymentMethod,
    date,
    enabled,
  );
  return subscription;
};
