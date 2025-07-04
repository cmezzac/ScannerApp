export const sendImageToReadShippingLabel = async (
  detailsPhoto: string,
  fullImagePhoto: string
) => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const endpoint = `${apiUrl}/reader/readShippingLabel`;

  console.log("🔄 Sending images to:", endpoint);

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
