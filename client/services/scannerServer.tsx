export const sendImageToReadShippingLabel = async (
  detailsPhoto: string,
  fullImagePhoto: string
) => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const endpoint = `${apiUrl}/reader/readShippingLabel`;
  console.log("Sending images to:", endpoint);

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      //Left hand side is word sensitive. (it's how the backend expects them)
      detailsImage: detailsPhoto,
      fullPackageImage: fullImagePhoto,
      isUrgent: false,
    }),
  });

  if (!res.ok) throw new Error("Failed to send images");

  return await res.json();
};
