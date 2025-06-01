import "dotenv/config";

export default {
  expo: {
    name: "Packeto",
    slug: "Packeto",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/PacketoLogo.png",
    scheme: "Packeto",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSCameraUsageDescription: "This app uses the camera to take pictures.",
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      permissions: ["CAMERA"],
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      "expo-audio", // ← ✅ Add this line
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      API_URL: process.env.API_URL || "https://default.com",
      ENV: process.env.ENV || "development",
    },
  },
};
