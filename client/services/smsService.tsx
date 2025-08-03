const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const notifyUsers = async (trackingNumbers: string[], token: any) => {
  const res = await fetch(`${apiUrl}/sms/notifyTenants`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      packageIds: trackingNumbers,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to notify users signed URL");
  }

  const data = await res.json();
  return data.message;
};
