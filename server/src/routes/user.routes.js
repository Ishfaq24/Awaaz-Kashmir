import { Router } from "express";
import { getProfile } from "../controllers/user.controller.js";

const router = Router();

router.get("/profile/:clerkId", getProfile);

export default router;
