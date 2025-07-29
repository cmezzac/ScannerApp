import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { AuthUser } from "../types/types"; // adjust path as needed
import { refreshAccessToken } from "@/services/authService";

// Context type
type AuthContextType = {
  user: AuthUser | null;
  accessToken: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (
    userData: AuthUser,
    accessToken: string,
    refreshToken: string
  ) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedRefreshToken = await AsyncStorage.getItem("refreshToken");
        const storedUser = await AsyncStorage.getItem("user");

        if (storedRefreshToken && storedUser) {
          const newAccessToken = await refreshAccessToken(storedRefreshToken);

          if (newAccessToken) {
            setAccessToken(newAccessToken);
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(true);
          } else {
            console.warn("Refresh token expired or invalid");
            await logout();
          }
        }
      } catch (err) {
        console.error("Failed to load auth data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAuthData();
  }, []);

  const login = async (
    userData: AuthUser,
    accessToken: string,
    refreshToken: string
  ) => {
    try {
      await AsyncStorage.setItem("refreshToken", refreshToken);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setAccessToken(accessToken);
      setUser(userData);
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(["refreshToken", "user"]);
      setAccessToken(null);
      setUser(null);
      setIsLoggedIn(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, isLoggedIn, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
