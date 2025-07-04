export const sendImageToReadShippingLabel = async (base64Image: string) => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const endpoint = `${apiUrl}/reader/readShippingLabel`;
  console.log("Sending image to:", endpoint);

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image: base64Image }),
  });

  if (!res.ok) throw new Error("Failed to send image");

  return await res.json(); // If you expect a result (e.g. tracking number, courier, etc.)
};
