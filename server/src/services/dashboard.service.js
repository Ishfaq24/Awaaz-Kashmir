import Report from "../models/Report.js";

export const getDashboardStatsService = async () => {
  const totalReports = await Report.countDocuments();

  const pending = await Report.countDocuments({
    status: {
      $in: [
        "Submitted",
        "Verified",
        "Assigned",
        "In Progress",
      ],
    },
  });

  const resolved = await Report.countDocuments({
    status: "Resolved",
  });

  const critical = await Report.countDocuments({
    severity: "High",
  });

  return {
    totalReports,
    pending,
    resolved,
    critical,
  };
};

export const getRecentReportsService = async () => {
  return Report.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();
};

export const getCategoryStatsService = async () => {
  return Report.aggregate([
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
  ]);
};

export const getTopDistrictsService = async () => {
  return Report.aggregate([
    {
      $group: {
        _id: {
          $ifNull: [
            "$location.district",
            "Unknown",
          ],
        },
        reports: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        reports: -1,
      },
    },
    {
      $limit: 5,
    },
  ]);
};

export const getMonthlyTrendService = async () => {
  return Report.aggregate([
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
        },
        reports: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
    {
      $project: {
        _id: 0,
        month: {
          $concat: [
            {
              $toString: "$_id.month",
            },
            "/",
            {
              $toString: "$_id.year",
            },
          ],
        },
        reports: 1,
      },
    },
  ]);
};

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

export const getPriorityQueueService = async () => {
  return Report.find({
    status: {
      $ne: "Resolved",
    },
  })
    .sort({
      severity: -1,
      trustScore: -1,
      createdAt: -1,
    })
    .limit(10)
    .lean();
};

export const getAISummaryService = async () => {
  const totalReports = await Report.countDocuments();

  const highSeverity = await Report.countDocuments({
    severity: "High",
  });

  const pending = await Report.countDocuments({
    status: {
      $in: [
        "Submitted",
        "Verified",
        "Assigned",
        "In Progress",
      ],
    },
  });

  const topCategory = await Report.aggregate([
    {
      $group: {
        _id: "$category",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $limit: 1,
    },
  ]);

  return {
    totalReports,
    pending,
    highSeverity,
    topCategory:
      topCategory.length > 0
        ? topCategory[0]
        : null,

    insights: [
      `${highSeverity} high severity reports require immediate attention.`,
      `${pending} reports are currently awaiting action.`,
      topCategory.length
        ? `${topCategory[0]._id} is currently the most reported category.`
        : "No dominant issue category yet.",
    ],
  };
};

export const getDepartmentPerformanceService =
  async () => {
    return Report.aggregate([
      {
        $group: {
          _id: {
            $ifNull: [
              "$assignedDepartment",
              "Unassigned",
            ],
          },

          total: {
            $sum: 1,
          },

          resolved: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    "$status",
                    "Resolved",
                  ],
                },
                1,
                0,
              ],
            },
          },

          pending: {
            $sum: {
              $cond: [
                {
                  $ne: [
                    "$status",
                    "Resolved",
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $project: {
          department: "$_id",
          total: 1,
          resolved: 1,
          pending: 1,

          performance: {
            $cond: [
              {
                $eq: ["$total", 0],
              },
              0,
              {
                $round: [
                  {
                    $multiply: [
                      {
                        $divide: [
                          "$resolved",
                          "$total",
                        ],
                      },
                      100,
                    ],
                  },
                  0,
                ],
              },
            ],
          },
        },
      },
      {
        $sort: {
          performance: -1,
        },
      },
    ]);
  };