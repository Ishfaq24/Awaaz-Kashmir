import { Router } from "express";

import isAdmin from "../middleware/isAdmin.js";

import {
  getPriorityQueue,
} from "../controllers/admin.controller.js";

const router = Router();

router.get(
  "/priority",
  isAdmin,
  getPriorityQueue
);

export default router;