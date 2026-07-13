import { Router } from "express";

import { protect } from "../middleware/auth.middleware.js";
import { syncUser } from "../controllers/auth.controller.js";

const router = Router();

router.post("/sync", protect, syncUser);

export default router;