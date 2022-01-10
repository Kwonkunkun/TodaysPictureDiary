import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "@hooks/useCachedResources";

import Navigation from "./src/navigation";
import { NativeBaseProvider, View } from "native-base";
import { RecoilRoot, useSetRecoilState } from "recoil";

import { PictureDiaryState } from "@state";
import useCustomAsyncStorage from "@hooks/useCustomAsyncStorage";
import { LogBox } from "react-native";
import _ from "lodash";

import auth from "@react-native-firebase/auth";

LogBox.ignoreLogs(["Warning:..."]); // ignore specific logs
LogBox.ignoreAllLogs(); // ignore all logs
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

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
              <SignInChecker>
                <Navigation />
                <StatusBar style="dark" />
              </SignInChecker>
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
    // const subscriber = auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     console.log(user);
    //   }
    // });
    // return subscriber;
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
