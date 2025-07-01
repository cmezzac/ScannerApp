const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const fetchPendingPackages = async () => {
  console.log("API URL: " + `${apiUrl}/package/pendingPackages`);
  const res = await fetch(`${apiUrl}/package/pendingPackages`);
  if (!res.ok) throw new Error("Network response was not ok");
  return await res.json();
};

export const fetchConfirmedPackages = async () => {
  console.log("API URL: " + `${apiUrl}/package/confirmedPackages`);
  const res = await fetch(`${apiUrl}/package/confirmedPackages`);
  if (!res.ok) throw new Error("Network response was not ok");
  return await res.json();
};
