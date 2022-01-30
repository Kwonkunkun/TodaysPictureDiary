import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "@hooks/useCachedResources";

import Navigation from "./src/navigation";
import { NativeBaseProvider, View } from "native-base";
import { RecoilRoot, useSetRecoilState } from "recoil";

import { BlockUserState, PictureDiaryState, UserState } from "@state";
import useCustomAsyncStorage from "@hooks/useCustomAsyncStorage";
import { LogBox } from "react-native";
import _ from "lodash";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { getAppUserWith } from "@Utils";
import { BlockUser } from "types/user";

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
  const setUser = useSetRecoilState(UserState);
  const setBlockUser = useSetRecoilState(BlockUserState);

  useEffect(() => {
    // const subscriber = auth().onAuthStateChanged((user) => {
    //   setUser(getAppUserWith(user));
    //   console.log(user);
    // });

    const subscriber = auth().onUserChanged((user) => {
      setUser(getAppUserWith(user));

      //여기서 user가 undefined가 아닐때마다, user block목록을 불러오고 그것을 recoil에다가 넣는다.
      if (user) {
        firestore()
          .collection("users")
          .doc(user.uid)
          .collection("blockUserGroup")
          .get()
          .then((snapshot) => {
            const data = snapshot.docs.map((docs) =>
              docs.data()
            ) as Array<BlockUser>;

            setBlockUser(data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setBlockUser(null);
      }
    });

    return subscriber;
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

  if (!isLoadingComplete) {
    return <View></View>;
  }

  return <View style={{ flex: 1 }} {...props} />;
};
