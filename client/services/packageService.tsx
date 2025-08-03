const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const fetchPendingPackages = async (token: any) => {
  console.log("API URL: " + `${apiUrl}/package/pendingPackages`);
  const res = await fetch(`${apiUrl}/package/pendingPackages`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (!res.ok) throw new Error("Network response was not ok");
  return await res.json();
};

export const fetchConfirmedPackages = async (token: any) => {
  console.log("API URL: " + `${apiUrl}/package/confirmedPackages`);
  const res = await fetch(`${apiUrl}/package/confirmedPackages`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (!res.ok) throw new Error("Network response was not ok");
  return await res.json();
};
