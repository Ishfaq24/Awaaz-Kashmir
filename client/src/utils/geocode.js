export const reverseGeocode = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch location");
    }
    const data = await response.json();

    const parts = [
      data.locality,
      data.city || data.principalSubdivision
    ].filter(Boolean);

    if (parts.length > 0) {
      return parts.join(", ");
    }

    return data.localityInfo?.administrative?.[0]?.name || "Location coordinates captured";
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return "Location coordinates captured";
  }
};
