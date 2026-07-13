import Report from "../models/Report.js";
import Comment from "../models/Comment.js";
import Confirmation from "../models/Confirmation.js";
import { notifyUser } from "./notification.service.js";
import { uploadBuffer } from "../config/cloudinary.js";

import { getIO } from "../socket.js";

/*
|--------------------------------------------------------------------------
| Create
|--------------------------------------------------------------------------
*/

const calculatePriority = (report) => {
  let score = 0;

  if (report.severity === "High") score += 60;
  if (report.severity === "Medium") score += 35;
  if (report.severity === "Low") score += 15;

  score += report.confirmations * 3;

  score += report.trustScore;

  score += Math.round(
    report.aiAnalysis?.confidence || 0
  );

  const age =
    (Date.now() -
      new Date(report.createdAt).getTime()) /
    (1000 * 60 * 60);

  score += Math.min(age, 24);

  return score;
};

export const createReportService = async (data) => {
  const report = await Report.create({
    title: data.title,
    description: data.description,
    category: data.category,
    severity: data.severity || "Medium",

    images: data.images || [],

    location: {
      address: data.location?.address,
      district: data.location?.district,
      coordinates: {
        lat: data.location?.coordinates?.lat,
        lng: data.location?.coordinates?.lng,
      },
    },

    createdBy: {
      clerkId: data.createdBy?.clerkId || "",
      name: data.createdBy?.name || "Citizen",
    },

    assignedDepartment:
      data.assignedDepartment || "",

    aiAnalysis: data.aiAnalysis || {},

    trustScore: 0,
    confirmations: 0,
    comments: 0,

    timeline: [
      {
        status: "Submitted",
        message: "Citizen submitted report.",
        user: "Citizen",
      },
    ],
  });

  report.priorityScore =
    calculatePriority(report);

  await report.save();
  getIO().emit("report-updated", report);
  await notifyUser(
  report,
  "Report Submitted",
  "Your civic issue has been submitted successfully.",
  "report"
);

  return report;
};

/*
|--------------------------------------------------------------------------
| Get Reports
|--------------------------------------------------------------------------
*/

export const getAllReportsService = async (
  query
) => {
  const {
    page = 1,
    limit = 10,
    category,
    severity,
    status,
    district,
    search,
  } = query;

  const filter = {};

  if (category) filter.category = category;

  if (severity) filter.severity = severity;

  if (status) filter.status = status;

  if (district)
    filter["location.district"] = district;

  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const reports = await Report.find(filter)
    .sort({
  priorityScore: -1,
  createdAt: -1,
})
    .skip((page - 1) * Number(limit))
    .limit(Number(limit));

  const total = await Report.countDocuments(
    filter
  );

  return {
    reports,

    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(
        total / Number(limit)
      ),
    },
  };
};

export const getReportByIdService = async (
  id
) => {
  const report = await Report.findById(id);

  if (!report) return null;

  report.views += 1;

  await report.save();
  getIO().emit("report-updated", report);

  return report;
};

/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
*/

export const updateReportService = async (
  id,
  data
) => {
  return Report.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteReportService = async (
  id
) => {
  return Report.findByIdAndDelete(id);
};

/*
|--------------------------------------------------------------------------
| Community Confirmation
|--------------------------------------------------------------------------
*/

export const confirmReportService =
  async (reportId, clerkId) => {
    const report =
      await Report.findById(reportId);

    if (!report)
      throw new Error("Report not found");

    const exists =
      await Confirmation.findOne({
        report: reportId,
        clerkId,
      });

    if (exists) {
      throw new Error(
        "Already confirmed."
      );
    }

    await Confirmation.create({
      report: reportId,
      clerkId,
    });

    report.confirmations += 1;

    report.trustScore = Math.min(
      100,
      report.trustScore + 5
    );

    report.timeline.push({
      status: "Confirmed",
      message: "Community confirmed report.",
      user: "Citizen",
    });
    report.priorityScore =
  calculatePriority(report);

    await report.save();
    getIO().emit("report-updated", report);
    await notifyUser(
  report,
  "Community Confirmation",
  "Another citizen confirmed your report.",
  "confirmation"
);

    return report;
  };

/*
|--------------------------------------------------------------------------
| Comments
|--------------------------------------------------------------------------
*/

export const addCommentService = async (
  reportId,
  clerkId,
  name,
  image,
  message
) => {
  const report =
    await Report.findById(reportId);

  if (!report)
    throw new Error("Report not found");

  const comment =
    await Comment.create({
      report: reportId,
      clerkId,
      name,
      image,
      message,
    });

  report.comments += 1;

  report.timeline.push({
    status: "Comment",
    message: `${name} commented.`,
    user: name,
  });

  report.priorityScore =
  calculatePriority(report);

  await report.save();
  getIO().emit("report-updated", report);

  await notifyUser(
  report,
  "New Comment",
  `${name} commented on your report.`,
  "comment"
);

  return comment;
};

export const getCommentsService = async (
  reportId
) => {
  return Comment.find({
    report: reportId,
  }).sort({
    createdAt: -1,
  });
};

/*
|--------------------------------------------------------------------------
| Admin Actions
|--------------------------------------------------------------------------
*/

export const verifyReportService =
  async (id, officer) => {
    const report =
      await Report.findById(id);

    if (!report)
      throw new Error("Report not found");

    report.status = "Verified";
    report.verifiedBy = officer;
    report.verifiedAt = new Date();

    report.timeline.push({
      status: "Verified",
      message: "Report verified.",
      user: officer,
    });
    report.priorityScore =
  calculatePriority(report);

    await report.save();
    getIO().emit("report-updated", report);
    await notifyUser(
  report,
  "Report Verified",
  "Your report has been verified by the authority.",
  "verification"
);

    return report;
  };

export const assignDepartmentService =
  async (id, department) => {
    const report =
      await Report.findById(id);

    if (!report)
      throw new Error("Report not found");

    report.assignedDepartment =
      department;

    report.status = "Assigned";

    report.timeline.push({
      status: "Assigned",
      message: `Assigned to ${department}.`,
      user: "Authority",
    });
    report.priorityScore =
  calculatePriority(report);

    await report.save();
    getIO().emit("report-updated", report);
    await notifyUser(
  report,
  "Department Assigned",
  `Your report has been assigned to ${department}.`,
  "assignment"
);

    return report;
  };

export const changeStatusService =
  async (id, status) => {
    const report =
      await Report.findById(id);

    if (!report)
      throw new Error("Report not found");

    report.status = status;

    report.timeline.push({
      status,
      message: `Status changed to ${status}.`,
      user: "Authority",
    });
    report.priorityScore =
  calculatePriority(report);

    await report.save();
getIO().emit("report-updated", report);
    return report;
  };

export const resolveReportService = async (
  id,
  notes,
  image
) => {
  const report = await Report.findById(id);

  if (!report) {
    throw new Error("Report not found");
  }

  if (image) {
    const uploaded = await uploadBuffer(
      image.buffer,
      "resolution-images"
    );

    report.resolutionImage = {
      url: uploaded.secure_url,
      publicId: uploaded.public_id,
    };
  }

  report.status = "Resolved";
  report.resolvedAt = new Date();
  report.resolutionNotes = notes;

  report.timeline.push({
    status: "Resolved",
    message: notes || "Issue resolved.",
    user: "Authority",
  });

  await report.save();
  getIO().emit("report-updated", report);

  return report;
};