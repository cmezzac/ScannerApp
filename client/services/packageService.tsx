const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const fetchPendingPackages = async () => {
  console.log("API URL: " + `${apiUrl}/package/pendingPackages`);
  const res = await fetch(`${apiUrl}/package/pendingPackages`);
  if (!res.ok) throw new Error("Network response was not ok");
  return await res.json();
};
