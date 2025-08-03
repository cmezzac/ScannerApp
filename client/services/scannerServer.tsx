export const sendImageToReadShippingLabel = async (
  detailsPhoto: string,
  fullImagePhoto: string,
  token: any
) => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const endpoint = `${apiUrl}/reader/readShippingLabel`;

  console.log("🔄 Sending images to:", endpoint);

  if (detailsPhoto != null) {
    console.log("Details photo is not null");
  }

  if (fullImagePhoto != null) {
    console.log("Full Image photo is not null");
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        detailsImage: detailsPhoto,
        fullPackageImage: fullImagePhoto,
        isUrgent: false,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Server returned error:", response.status, errorText);
      throw new Error(`Failed: ${response.status} - ${errorText}`);
    }

    const result = await response.json();

    if (
      !result ||
      !result.name ||
      !result.trackingNumber ||
      !result.apartment ||
      !result.courier
    ) {
      console.warn("⚠️ Incomplete result:", result);
      throw new Error("Incomplete data received from server");
    }

    console.log("✅ Parsed package result:", result);
    return result;
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error("Request timed out after 10s");
    }
    console.error("❌ Image send failed:", err.message);
    throw err;
  }
};
