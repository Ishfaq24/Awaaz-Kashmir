import { Router } from "express";
import upload from "../middleware/upload.js";
import {
  analyzeReportImage,
  checkDuplicates,
} from "../controllers/ai.controller.js";

const router = Router();

router.post(
  "/analyze",
  upload.single("image"),
  analyzeReportImage
);

router.post("/check-duplicates", checkDuplicates);

export default router;
