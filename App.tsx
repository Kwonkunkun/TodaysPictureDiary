import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useColorScheme from "@hooks/useColorScheme";
import useCachedResources from "@hooks/useCachedResources";

import Navigation from "./src/navigation";
import { NativeBaseProvider } from "native-base";
import { Colors } from "@constants";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NativeBaseProvider>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar style="dark" />
        </SafeAreaProvider>
      </NativeBaseProvider>
    );
  }
}
