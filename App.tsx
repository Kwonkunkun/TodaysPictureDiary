import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "@hooks/useCachedResources";

import Navigation from "./src/navigation";
import { NativeBaseProvider } from "native-base";
import { RecoilRoot } from "recoil";

/**
 * login checker
 */

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NativeBaseProvider>
        <SafeAreaProvider>
          <RecoilRoot>
            <Navigation />
            <StatusBar style="dark" />
          </RecoilRoot>
        </SafeAreaProvider>
      </NativeBaseProvider>
    );
  }
}
