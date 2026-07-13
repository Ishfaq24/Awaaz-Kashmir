import { Router } from "express";

import {
  getUserNotifications,
  readNotification,
  readAllNotifications,
  deleteNotification,
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

router.delete(
  "/:id",
  deleteNotification
);

export default router;