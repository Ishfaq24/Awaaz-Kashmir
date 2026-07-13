import clerkClient from "../config/clerk.js";
import User from "../models/User.js";

export const syncUserService = async (clerkId) => {
  const clerkUser = await clerkClient.users.getUser(clerkId);

  const email =
    clerkUser.emailAddresses[0]?.emailAddress || "";

  let user = await User.findOne({
    clerkId,
  });

  if (!user) {
    user = await User.create({
      clerkId,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      email,
      image: clerkUser.imageUrl,
    });
  } else {
    user.firstName = clerkUser.firstName;
    user.lastName = clerkUser.lastName;
    user.email = email;
    user.image = clerkUser.imageUrl;

    await user.save();
  }

  return user;
};