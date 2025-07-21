import { isRunningInExpoGo } from "expo";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";

SplashScreen.preventAutoHideAsync();

if (!isRunningInExpoGo()) {
  SplashScreen.setOptions({
    duration: 800,
    fade: true,
  });
}

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // All preloading logic goes here
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShadowVisible: false,
            // headerStyle: { backgroundColor: Colors.identity.primary },
            headerTitle: () => (
              <View
                onLayout={onLayoutRootView}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
                }}
              >
                <Text style={{ fontSize: 24, fontWeight: "bold" }}>Sonarquot</Text>
              </View>
            ),
          }}
        />
      </Stack>
      <StatusBar style="auto" animated />
    </>
  );
}
