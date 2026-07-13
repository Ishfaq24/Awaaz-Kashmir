import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Road",
        "Water",
        "Electricity",
        "Garbage",
        "Drainage",
        "Street Light",
        "Traffic",
        "Other",
      ],
      required: true,
    },

    severity: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: [
        "Submitted",
        "Verified",
        "Assigned",
        "In Progress",
        "Resolved",
        "Rejected",
      ],
      default: "Submitted",
    },

    images: [
      {
        url: String,
        publicId: String,
      },
    ],
   resolutionImage: {
  url: {
    type: String,
    default: "",
  },
  publicId: {
    type: String,
    default: "",
  },
},

resolvedAt: {
  type: Date,
},

resolutionNotes: {
  type: String,
  default: "",
},

    location: {
      address: String,

      district: String,

      coordinates: {
        lat: Number,
        lng: Number,
      },
    },

    createdBy: {
      clerkId: String,
      name: String,
    },

    assignedDepartment: {
      type: String,
      default: "",
    },

    assignedOfficer: {
      type: String,
      default: "",
    },

    verifiedBy: {
      type: String,
      default: "",
    },

    verifiedAt: Date,

    resolvedAt: Date,

    resolutionNotes: {
      type: String,
      default: "",
    },

    priority: {
      type: Number,
      default: 0,
    },

    trustScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    confirmations: {
      type: Number,
      default: 0,
    },

    views: {
      type: Number,
      default: 0,
    },

    comments: {
      type: Number,
      default: 0,
    },

    aiAnalysis: {
      title: String,
      description: String,
      confidence: Number,
      category: String,
      severity: String,
      department: String,
    },
    priorityScore: {
  type: Number,
  default: 0,
},

    timeline: [
      {
        status: String,

        message: String,

        user: {
          type: String,
          default: "System",
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

reportSchema.index({
  category: 1,
  status: 1,
  severity: 1,
});

reportSchema.index({
  "location.coordinates.lat": 1,
  "location.coordinates.lng": 1,
});

reportSchema.index({
  createdAt: -1,
});

export default mongoose.model("Report", reportSchema);