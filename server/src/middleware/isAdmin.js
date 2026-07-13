import ApiError from "../utils/ApiError.js";
import { SUPER_ADMIN } from "../config/admin.js";

export default function isAdmin(
  req,
  res,
  next
) {
  const clerkId = req.headers["x-clerk-id"];

  if (clerkId !== SUPER_ADMIN.clerkId) {
    throw new ApiError(
      403,
      "Only the Super Admin can perform this action."
    );
  }

  next();
}