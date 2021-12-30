import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "@hooks/useCachedResources";

import Navigation from "./src/navigation";
import { NativeBaseProvider, View } from "native-base";
import { RecoilRoot, useRecoilState } from "recoil";

import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { PictureDiaryState } from "@state";
import AuthService from "@service/auth_service";
import PictureDiaryRepository from "@service/pictureDiary_repository";

const authService = new AuthService();
const pictureDiaryRepositoryService = new PictureDiaryRepository();

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <RecoilRoot>
        <NativeBaseProvider>
          <SafeAreaProvider>
            {/* <GlobalStateSetter> */}
            <SignInChecker>
              <Navigation />
              <StatusBar style="dark" />
            </SignInChecker>
            {/* </GlobalStateSetter> */}
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
  const { getItem } = useAsyncStorage("@pictureDiaries");
  const [pictureDiaries, setPictureDiaries] = useRecoilState(PictureDiaryState);

  useEffect(() => {
    getItem((err, pictureDiariesString) => {
      if (pictureDiariesString) {
        const pictureDiaries = JSON.parse(
          pictureDiariesString
        ) as Array<PictureDiary>;
        setPictureDiaries(pictureDiaries);
      }
    });
  }, []);

  return <View style={{ flex: 1 }} {...props} />;
};
