const apiUrl = process.env.EXPO_PUBLIC_API_URL;

// TTL: 300s = 5:00 min
export const fetchPreSignedS3Photo = async (keyOrUrl: string, token: any) => {
  const key = extractS3Key(keyOrUrl); // Trim the URL if needed

  console.log("KEY: ", key);

  const encodedKey = encodeURIComponent(key);

  const res = await fetch(`${apiUrl}/s3/presignedUrl?key=${encodedKey}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch signed URL");
  }

  const data = await res.json();
  return data.url;
};

const extractS3Key = (input: string): string => {
  try {
    const url = new URL(input);
    return url.pathname.slice(1); // removes the leading slash
  } catch {
    return input; // input is already a key
  }
};
