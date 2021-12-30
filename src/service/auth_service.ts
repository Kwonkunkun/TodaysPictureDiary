import {
  FacebookAuthProvider,
  signInWithCredential,
  User,
} from "firebase/auth";
import { firebaseAuth } from "./firebase";
import * as Facebook from "expo-facebook";
import { FACEBOOK_APP_ID } from "@env";

class AuthService {
  logout() {
    firebaseAuth.signOut();
  }

  onAuthChange(onUserChanged: (user: User | null) => void) {
    firebaseAuth.onAuthStateChanged((user) => {
      onUserChanged(user);
    });
  }

  async loginWithFacebook() {
    await Facebook.initializeAsync({ appId: FACEBOOK_APP_ID });

    const result = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile"],
    });

    if (result.type === "success") {
      // Build Firebase credential with the Facebook access token.
      // const facebookAuthProvider = new FacebookAuthProvider();
      const credential = FacebookAuthProvider.credential(result.token);

      // Sign in with credential from the Facebook user.
      signInWithCredential(firebaseAuth, credential)
        .then((result) => console.log(result.user))
        .catch((error) => {
          // Handle Errors here.
          console.log(error);
        });
    }
  }
}
export default AuthService;
