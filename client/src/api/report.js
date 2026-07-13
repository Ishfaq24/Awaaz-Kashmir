import api from "../lib/api";

/*
|--------------------------------------------------------------------------
| Upload Image
|--------------------------------------------------------------------------
*/

export const uploadImage = async (
  image,
  onUploadProgress
) => {
  const formData = new FormData();

  formData.append("image", image);

  const response = await api.post(
    "/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    }
  );

  return response.data.data.image;
};

/*
|--------------------------------------------------------------------------
| Create Report
|--------------------------------------------------------------------------
*/

export const createReport = async (report) => {
  const response = await api.post(
    "/reports",
    report
  );

  return response.data.data;
};

/*
|--------------------------------------------------------------------------
| Reports
|--------------------------------------------------------------------------
*/

export const getReports = async () => {
  const response = await api.get("/reports");

  return response.data.data.reports;
};

export const getReportById = async (id) => {
  const response = await api.get(
    `/reports/${id}`
  );

  return response.data.data;
};

/*
|--------------------------------------------------------------------------
| Community
|--------------------------------------------------------------------------
*/

export const confirmReport = async (
  id,
  clerkId
) => {
  const response = await api.post(
    `/reports/${id}/confirm`,
    {
      clerkId,
    }
  );

  return response.data.data;
};

export const getComments = async (id) => {
  const response = await api.get(
    `/reports/${id}/comments`
  );

  return response.data.data;
};

export const addComment = async (
  id,
  comment
) => {
  const response = await api.post(
    `/reports/${id}/comments`,
    comment
  );

  return response.data.data;
};

/*
|--------------------------------------------------------------------------
| Authority
|--------------------------------------------------------------------------
*/

export const verifyReport = async (
  id,
  clerkId
) => {
  const response = await api.patch(
    `/reports/verify/${id}`,
    {},
    {
      headers: {
        "x-clerk-id": clerkId,
      },
    }
  );

  return response.data.data;
};

export const assignDepartment = async (
  id,
  department,
  clerkId
) => {
  const response = await api.patch(
    `/reports/assign/${id}`,
    {
      department,
    },
    {
      headers: {
        "x-clerk-id": clerkId,
      },
    }
  );

  return response.data.data;
};

export const changeReportStatus = async (
  id,
  status,
  clerkId
) => {
  const response = await api.patch(
    `/reports/status/${id}`,
    {
      status,
    },
    {
      headers: {
        "x-clerk-id": clerkId,
      },
    }
  );

  return response.data.data;
};

export const resolveReport = async (
  id,
  notes,
  clerkId,
  image
) => {
  const formData = new FormData();

  formData.append("notes", notes);

  if (image) {
    formData.append(
      "resolutionImage",
      image
    );
  }

  const response = await api.patch(
    `/reports/resolve/${id}`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
        "x-clerk-id": clerkId,
      },
    }
  );

  return response.data.data;
};

export const deleteReport = async (
  id,
  clerkId
) => {
  const response = await api.delete(
    `/reports/${id}`,
    {
      headers: {
        "x-clerk-id": clerkId,
      },
    }
  );

  return response.data.data;
};

/*
|--------------------------------------------------------------------------
| Nearby Reports
|--------------------------------------------------------------------------
*/

export const getNearbyReports = async (
  id
) => {
  const response = await api.get(
    `/reports/nearby/${id}`
  );

  return response.data.data;
};