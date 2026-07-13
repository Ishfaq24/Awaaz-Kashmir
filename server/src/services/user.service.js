import User from "../models/User.js";

export const getUserByClerkId = async (clerkId) => {
  return User.findOne({ clerkId });
};

export const createUser = async (data) => {
  return User.create(data);
};