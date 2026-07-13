import clerkClient from "../config/clerk.js";
import ApiError from "../utils/ApiError.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new ApiError(401, "Unauthorized");
    }

    const token = authHeader.replace("Bearer ", "");

    const payload = await clerkClient.verifyToken(token);

    req.auth = payload;

    next();
  } catch (error) {
    next(new ApiError(401, "Unauthorized"));
  }
};