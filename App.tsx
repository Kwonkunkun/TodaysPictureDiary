import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "@hooks/useCachedResources";

import Navigation from "./src/navigation";
import { NativeBaseProvider, View } from "native-base";
import { RecoilRoot, useSetRecoilState } from "recoil";

import { PictureDiaryState } from "@state";
import AuthService from "@service/auth_service";
import PictureDiaryRepository from "@service/pictureDiary_repository";
import useCustomAsyncStorage from "@hooks/useCustomAsyncStorage";
import * as SplashScreen from "expo-splash-screen";
import { LogBox } from "react-native";
import _ from "lodash";

LogBox.ignoreLogs(["Warning:..."]); // ignore specific logs
LogBox.ignoreAllLogs(); // ignore all logs
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

const authService = new AuthService();
const pictureDiaryRepositoryService = new PictureDiaryRepository();

SplashScreen.preventAutoHideAsync()
  .then((result) =>
    console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
  )
  .catch(console.warn); // it's good to explicitly catch and inspect any error

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <RecoilRoot>
        <NativeBaseProvider>
          <SafeAreaProvider>
            <GlobalStateSetter>
              {/* <SignInChecker> */}
              <Navigation />
              <StatusBar style="dark" />
              {/* </SignInChecker> */}
            </GlobalStateSetter>
          </SafeAreaProvider>
        </NativeBaseProvider>
      </RecoilRoot>
    );
  }
}

const SignInChecker = (
  props: Readonly<{
    children?: React.ReactNode;
  }>
) => {
  useEffect(() => {
    authService.onAuthChange((user) => {
      console.log(user);
    });
  }, []);

  return <View style={{ flex: 1 }} {...props} />;
};

const GlobalStateSetter = (
  props: Readonly<{
    children?: React.ReactNode;
  }>
) => {
  const setPictureDiaries = useSetRecoilState(PictureDiaryState);
  const { response, error, isLoadingComplete } = useCustomAsyncStorage<
    Array<PictureDiary>
  >({
    key: "@pictureDiaries",
  });

  useEffect(() => {
    if (response) {
      setPictureDiaries(response);
    }
  }, [response]);

  return <View style={{ flex: 1 }} {...props} />;
};
