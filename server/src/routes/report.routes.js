import { Router } from "express";

import {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
  confirmReport,
  addComment,
  getComments,
  verifyReport,
  assignDepartment,
  changeStatus,
  resolveReport,
} from "../controllers/report.controller.js";

import upload from "../middleware/upload.js";

import { getNearbyReports } from "../controllers/nearby.controller.js";
import isAdmin from "../middleware/isAdmin.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Citizen
|--------------------------------------------------------------------------
*/

router.post("/", createReport);

router.get("/", getAllReports);

router.get("/nearby/:id", getNearbyReports);

router.get("/:id", getReportById);

router.put("/:id", updateReport);

router.delete(
  "/:id",
  isAdmin,
  deleteReport
);

router.post("/:id/confirm", confirmReport);

router.post("/:id/comments", addComment);

router.get("/:id/comments", getComments);

/*
|--------------------------------------------------------------------------
| Authority
|--------------------------------------------------------------------------
*/
router.patch(
  "/verify/:id",
  isAdmin,
  verifyReport
);

router.patch(
  "/assign/:id",
  isAdmin,
  assignDepartment
);

router.patch(
  "/status/:id",
  isAdmin,
  changeStatus
);

router.patch(
  "/resolve/:id",
  isAdmin,
  upload.single("resolutionImage"),
  resolveReport
);
export default router;