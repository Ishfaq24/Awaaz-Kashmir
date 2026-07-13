import { Router } from "express";

import {
  getUserNotifications,
  readNotification,
  readAllNotifications,
} from "../controllers/notification.controller.js";

const router = Router();

router.get(
  "/:clerkId",
  getUserNotifications
);

router.patch(
  "/read/:id",
  readNotification
);

router.patch(
  "/read-all/:clerkId",
  readAllNotifications
);

export default router;