import Report from "../models/Report.js";

const severityWeight = {
  High: 60,
  Medium: 35,
  Low: 15,
};

export const getPriorityQueueService = async () => {
  const reports = await Report.find({
    status: {
      $in: [
        "Submitted",
        "Verified",
        "Assigned",
        "In Progress",
      ],
    },
  }).sort({
    createdAt: -1,
  });

  return reports
    .map((report) => {
      const ageHours =
        (Date.now() -
          new Date(report.createdAt).getTime()) /
        (1000 * 60 * 60);

      const priorityScore =
        (severityWeight[report.severity] || 0) +
        (report.trustScore || 0) +
        (report.confirmations || 0) * 3 +
        Math.round(
          report.aiAnalysis?.confidence || 0
        ) +
        Math.min(Math.round(ageHours), 24);

      return {
        ...report.toObject(),
        priorityScore,
      };
    })
    .sort(
      (a, b) =>
        b.priorityScore - a.priorityScore
    )
    .slice(0, 10);
};