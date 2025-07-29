import { AuthUser } from "@/types/types";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const verifyLogin = async (
  usernameInput: string,
  passwordInput: string
) => {
  const res = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: usernameInput,
      password: passwordInput,
    }),
  });

  if (!res.ok) {
    throw new Error(`Login failed: ${res.status}`);
  }

  const data = await res.json();
  const flattened: AuthUser = {
    ...data.user,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };

  return flattened;
};

export const refreshAccessToken = async (
  refreshToken: string
): Promise<string | null> => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (!response.ok) throw new Error("Failed to refresh token");

    const data = await response.json();
    return data.accessToken;
  } catch (err) {
    console.error("Token refresh error in authService:", err);
    return null;
  }
};
