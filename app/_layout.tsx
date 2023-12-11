import React, { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const [fontsLoader] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  useEffect(() => {
    const onLayoutRootView = async () => {
      if (fontsLoader) {
        await SplashScreen.hideAsync();
      }
    };

    onLayoutRootView();

    return () => {
      return null;
    };
  }, [fontsLoader]);

  if (!fontsLoader) return null;

  return <Stack />;
};

export default Layout;
