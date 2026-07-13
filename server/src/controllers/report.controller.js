import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

import {
  createReportService,
  getAllReportsService,
  getReportByIdService,
  updateReportService,
  deleteReportService,
  confirmReportService,
  addCommentService,
  getCommentsService,
  verifyReportService,
  assignDepartmentService,
  changeStatusService,
  resolveReportService,
} from "../services/report.service.js";

/*
|--------------------------------------------------------------------------
| Create Report
|--------------------------------------------------------------------------
*/

export const createReport = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    category,
    severity,
    images,
    location,
    createdBy,
    assignedDepartment,
    aiAnalysis,
  } = req.body;

  if (!title || !description || !category) {
    throw new ApiError(
      400,
      "Title, Description and Category are required."
    );
  }

  const report = await createReportService({
    title,
    description,
    category,
    severity,
    images,
    location,
    createdBy,
    assignedDepartment,
    aiAnalysis,
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      report,
      "Report created successfully"
    )
  );
});

/*
|--------------------------------------------------------------------------
| Get Reports
|--------------------------------------------------------------------------
*/

export const getAllReports = asyncHandler(async (req, res) => {
  const reports = await getAllReportsService(req.query);

  return res.status(200).json(
    new ApiResponse(
      200,
      reports,
      "Reports fetched successfully"
    )
  );
});

export const getReportById = asyncHandler(async (req, res) => {
  const report = await getReportByIdService(req.params.id);

  if (!report) {
    throw new ApiError(404, "Report not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      report,
      "Report fetched successfully"
    )
  );
});

/*
|--------------------------------------------------------------------------
| Update/Delete
|--------------------------------------------------------------------------
*/

export const updateReport = asyncHandler(async (req, res) => {
  const report = await updateReportService(
    req.params.id,
    req.body
  );

  if (!report) {
    throw new ApiError(404, "Report not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      report,
      "Report updated successfully"
    )
  );
});

export const deleteReport = asyncHandler(async (req, res) => {
  const report = await deleteReportService(
    req.params.id
  );

  if (!report) {
    throw new ApiError(404, "Report not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Report deleted successfully"
    )
  );
});

/*
|--------------------------------------------------------------------------
| Community
|--------------------------------------------------------------------------
*/

export const confirmReport = asyncHandler(async (req, res) => {
  const { clerkId } = req.body;

  if (!clerkId) {
    throw new ApiError(
      400,
      "clerkId is required"
    );
  }

  const report = await confirmReportService(
    req.params.id,
    clerkId
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      report,
      "Report confirmed successfully"
    )
  );
});

export const addComment = asyncHandler(async (req, res) => {
  const {
    clerkId,
    name,
    image,
    message,
  } = req.body;

  if (!message) {
    throw new ApiError(
      400,
      "Comment is required."
    );
  }

  const comment = await addCommentService(
    req.params.id,
    clerkId,
    name,
    image,
    message
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      comment,
      "Comment added successfully"
    )
  );
});

export const getComments = asyncHandler(async (req, res) => {
  const comments =
    await getCommentsService(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      comments,
      "Comments fetched successfully"
    )
  );
});

/*
|--------------------------------------------------------------------------
| Admin Actions
|--------------------------------------------------------------------------
*/

export const verifyReport = asyncHandler(async (req, res) => {
  const { officer } = req.body;

  const report = await verifyReportService(
    req.params.id,
    officer || "Authority"
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      report,
      "Report verified successfully"
    )
  );
});

export const assignDepartment = asyncHandler(async (req, res) => {
  const { department } = req.body;

  if (!department) {
    throw new ApiError(
      400,
      "Department is required"
    );
  }

  const report =
    await assignDepartmentService(
      req.params.id,
      department
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      report,
      "Department assigned successfully"
    )
  );
});

export const changeStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!status) {
    throw new ApiError(
      400,
      "Status is required"
    );
  }

  const report =
    await changeStatusService(
      req.params.id,
      status
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      report,
      "Status updated successfully"
    )
  );
});

export const resolveReport = asyncHandler(async (req, res) => {
  const { notes } = req.body;

  const report = await resolveReportService(
    req.params.id,
    notes,
    req.file
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      report,
      "Report resolved successfully"
    )
  );
});