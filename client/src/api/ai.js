import api from "../lib/api";

export const analyzeImage = async (
  image,
  { description = "", lat, lng } = {},
  onUploadProgress
) => {
  const formData = new FormData();
  formData.append("image", image);

  if (description) {
    formData.append("description", description);
  }

  if (lat !== undefined && lng !== undefined) {
    formData.append("lat", String(lat));
    formData.append("lng", String(lng));
  }

  const response = await api.post("/ai/analyze", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });

  return response.data.data;
};
