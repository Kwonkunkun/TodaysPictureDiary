import { FirebaseAuthTypes } from "@react-native-firebase/auth";

type User = {
  uid: string;
  displayName: string;
  photoURL?: string;
};
