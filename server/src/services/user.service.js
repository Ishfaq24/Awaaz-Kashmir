import User from "../models/User.js";
import Report from "../models/Report.js";

export const getUserByClerkId = async (clerkId) => {
  return User.findOne({ clerkId });
};

export const createUser = async (data) => {
  return User.create(data);
};

export const getProfileService = async (clerkId) => {
  const user = await User.findOne({ clerkId });

  const reports = await Report.countDocuments({
    "createdBy.clerkId": clerkId,
  });

  const resolved = await Report.countDocuments({
    "createdBy.clerkId": clerkId,
    status: "Resolved",
  });

  const trustScore = user?.trustScore ?? 50;
  const confirmations = user?.confirmations ?? 0;

  const achievements = [];

  if (reports >= 1) {
    achievements.push({
      title: "First Report",
      description: "Submitted your first civic issue report.",
    });
  }

  if (trustScore >= 70) {
    achievements.push({
      title: "Trusted Citizen",
      description: "Maintained a high trust score.",
    });
  }

  if (confirmations >= 3) {
    achievements.push({
      title: "Community Verifier",
      description: "Confirmed multiple nearby issues.",
    });
  }

  if (resolved >= 1) {
    achievements.push({
      title: "Impact Maker",
      description: "Had at least one report resolved.",
    });
  }

  return {
    role: user?.role || "citizen",
    trustScore,
    reports,
    resolved,
    confirmations,
    level: Math.min(10, Math.floor(trustScore / 10) + 1),
    badges: achievements.length,
    achievements,
  };
};
