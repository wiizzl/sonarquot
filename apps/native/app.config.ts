import type { ConfigContext, ExpoConfig } from "expo/config";

import { description, version } from "./package.json";

const EAS_PROJECT_ID = "49790752-1479-4718-886e-cb5230ea92b3";
const PROJECT_SLUG = "sonarquot";
const OWNER = "wiizz";

const APP_NAME = "Sonarquot";
const BUNDLE_IDENTIFIER = "com.wiizz.sonarquot";
const PACKAGE_NAME = "com.wiizz.sonarquot";
const SCHEME = "sonarquot";

export default ({ config }: ConfigContext): ExpoConfig => {
  console.log("⚙️ Environment:", process.env.APP_ENV);
  const appConfig = getDynamicAppConfig(
    (process.env.APP_ENV as "development" | "preview" | "production") || "development",
  );

  return {
    ...config,
    name: appConfig.name,
    description,
    slug: PROJECT_SLUG,
    owner: OWNER,
    version,
    platforms: ["android", "ios"],
    githubUrl: "https://github.com/wiizzl/sonarquot",
    orientation: "portrait",
    userInterfaceStyle: "automatic",
    primaryColor: "#ffffff",
    icon: "./src/assets/images/icons/ios-dark.png",
    scheme: appConfig.scheme,
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      icon: {
        light: "./src/assets/images/icons/ios-light.png",
        dark: "./src/assets/images/icons/ios-dark.png",
        tinted: "./src/assets/images/icons/ios-tinted.png",
      },
      bundleIdentifier: appConfig.bundleIdentifier,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/images/icons/adaptive-icon.png",
        monochromeImage: "./src/assets/images/icons/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      package: appConfig.packageName,
    },
    extra: {
      eas: {
        projectId: EAS_PROJECT_ID,
      },
    },
    updates: {
      url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./src/assets/images/icons/splash-icon-dark.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            image: "./src/assets/images/icons/splash-icon-light.png",
            backgroundColor: "#000000",
          },
        },
      ],
      [
        "expo-font",
        {
          fonts: ["./src/assets/fonts/SpaceMono-Regular.ttf"],
        },
      ],
      [
        "expo-audio",
        {
          microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone.",
        },
      ],
      [
        "expo-dev-client",
        {
          launchMode: "most-recent",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
  };
};

const getDynamicAppConfig = (environment: "development" | "preview" | "production") => {
  if (environment === "production") {
    return {
      name: APP_NAME,
      bundleIdentifier: BUNDLE_IDENTIFIER,
      packageName: PACKAGE_NAME,
      scheme: SCHEME,
    };
  }

  if (environment === "preview") {
    return {
      name: `${APP_NAME} Preview`,
      bundleIdentifier: `${BUNDLE_IDENTIFIER}.preview`,
      packageName: `${PACKAGE_NAME}.preview`,
      scheme: `${SCHEME}-prev`,
    };
  }

  return {
    name: `${APP_NAME} Development`,
    bundleIdentifier: `${BUNDLE_IDENTIFIER}.dev`,
    packageName: `${PACKAGE_NAME}.dev`,
    scheme: `${SCHEME}-dev`,
  };
};
