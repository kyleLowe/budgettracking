import express from "express";
import * as SubscriptionController from "../controllers/SubscriptionController";

//Route -> Controller -> Service -> DAO -> Model
const router = express.Router();

router.get("/:subscriptionId", SubscriptionController.getSubscriptionByID);
router.get("/user/:userId", SubscriptionController.getSubscriptionsByUserID);
router.post("/", SubscriptionController.createSubscription);
router.put("/:subscriptionId", SubscriptionController.updateSubscription);
router.delete("/:subscriptionId", SubscriptionController.deleteSubscription);

export default router;
