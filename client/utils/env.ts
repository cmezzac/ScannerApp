// src/utils/env.ts
import Constants from "expo-constants";

type EnvVars = {
  API_URL: string;
  ENV: string;
};

const config = Constants.expoConfig?.extra as EnvVars;

export default config;
