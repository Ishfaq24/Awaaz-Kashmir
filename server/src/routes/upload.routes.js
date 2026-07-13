import { Router } from "express";

import upload from "../middleware/upload.js";
import { uploadReportImage } from "../controllers/upload.controller.js";

const router = Router();

/*
POST /api/upload
Body (multipart/form-data)
--------------------------------
image : File
--------------------------------
Returns:
{
  image:{
    url,
    publicId
  }
}
*/
router.post(
  "/",
  upload.single("image"),
  uploadReportImage
);

export default router;