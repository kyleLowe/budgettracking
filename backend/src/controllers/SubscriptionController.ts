import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import * as SubscriptionServices from "../services/SubscriptionServices";

export const getSubscriptionByID = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const _subscriptionId = req.params.subscriptionId as string;
    if (!_subscriptionId) {
      throw new Error("Subscription ID is required");
    }
    const subscriptionId = new Types.ObjectId(_subscriptionId);
    const subscription =
      await SubscriptionServices.getSubscriptionByID(subscriptionId);
    res.status(200).json(subscription);
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionsByUserID = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.session.userId) {
      throw new Error("User ID is required");
    }
    const userId = new Types.ObjectId(req.session.userId);
    const subscriptions =
      await SubscriptionServices.getSubscriptionsByUserID(userId);
    res.status(200).json(subscriptions);
  } catch (error) {
    next(error);
  }
};

export const createSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.session.userId) {
      throw new Error("User ID is required");
    }
    const userId = new Types.ObjectId(req.session.userId);
    const {
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
    } = req.body;
    if (
      !amount ||
      !currency ||
      !category ||
      !store ||
      !name ||
      !frequency ||
      !paymentMethod ||
      !date ||
      enabled === undefined
    ) {
      throw new Error("Required fields are missing");
    }
    const subscription = await SubscriptionServices.createSubscription(
      userId,
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
    res.status(201).json(subscription);
  } catch (error) {
    next(error);
  }
};

export const deleteSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const _subscriptionId = req.params.subscriptionId as string;
    if (!_subscriptionId) {
      throw new Error("Subscription ID is required");
    }
    const subscriptionId = new Types.ObjectId(_subscriptionId);
    let subscription =
      await SubscriptionServices.getSubscriptionByID(subscriptionId);
    if (!subscription) {
      throw new Error("Subscription not found");
    }
    subscription =
      await SubscriptionServices.deleteSubscription(subscriptionId);
    res.status(200).json(subscription);
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const _subscriptionId = req.params.subscriptionId as string;
    if (!_subscriptionId) {
      throw new Error("Subscription ID is required");
    }
    const subscriptionId = new Types.ObjectId(_subscriptionId);
    let subscription =
      await SubscriptionServices.getSubscriptionByID(subscriptionId);
    if (!subscription) {
      throw new Error("Subscription not found");
    }
    const userId = new Types.ObjectId(req.session.userId);
    if (subscription.userId.toString() !== userId.toString()) {
      throw new Error("You are not authorized to update this subscription");
    }
    const {
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
    } = req.body;
    await SubscriptionServices.updateSubscription(
      subscriptionId,
      userId,
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
    subscription =
      await SubscriptionServices.getSubscriptionByID(subscriptionId);
    res.status(200).json(subscription);
  } catch (error) {
    next(error);
  }
};
