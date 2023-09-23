import { signInWithEmailAndPassword } from "firebase/auth";
import { IFirebaseUser, IUserCredentials, emptyFireBaseUser } from "../../Models";
import { Auth } from "../AdminFirebase";

export const login = async (user: IUserCredentials): Promise<IFirebaseUser | Error> => {
  let verifiedUser: IFirebaseUser = emptyFireBaseUser;

  try {
    return await signInWithEmailAndPassword(Auth, user.email, user.password).then((firebaseUser) => {
      const { email, displayName = "", emailVerified } = firebaseUser.user;
      const verifiedUser = {
        displayName: displayName || "",
        phoneNumber: "",
        email: email || "",
        photoURL: "",
        providerId: "",
        uid: firebaseUser.user.uid,
        emailVerified: emailVerified,
        idToken: "",
      };
      return verifiedUser;
    });
  } catch (e) {
    throw new Error("user could not be signed in ");
  }
};

export const attachIdTokenToUser = async (): Promise<string | Error> => {
  try {
    const token = await Auth.currentUser?.getIdToken();
    if (token) return token;
    throw new Error("Cannot ge Id token");
  } catch (e) {
    throw new Error("Cannot get Id token");
  }
};

export const signOut = async () => {
  console.log("final signout");
  await Auth.signOut();
};
