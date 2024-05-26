import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { notify } from "@/components/Notification";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (identifier, password) => {
    try {
      if (isValidEmail(identifier)) {
        signInWithEmailAndPassword(auth, identifier, password)
          .then(async (userCredentials) => {
            const userData = await getUserData(userCredentials.user.uid);
            setCurrentUser(userData);
            notify('Signed In', 'success')
          })
          .catch((error) => {
            if (error.code == "auth/invalid-credential")
              notify("Login Error: ", error);
          });
      } else {
        const email = await getUserEmailByUsername(identifier);
        signInWithEmailAndPassword(auth, email, password)
          .then(async (userCredentials) => {
            const userData = await getUserData(userCredentials.user.uid);
            setCurrentUser(userData);
          })
          .catch((error) => {
            if (error.code == "auth/invalid-credential")
              console.error("Login Error: ", error);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signup = async (email, password, username, firstName, lastName) => {
    try {
      const isUsernameUnique = async () => {
        try {
          const q = query(
            collection(db, "users"),
            where("username", "==", username)
          );
          const querySnapshot = await getDocs(q);
          return querySnapshot.empty;
        } catch (error) {
          console.error("error checking uniqueness");
          console.error(error);
        }
      };

      const isUnique = await isUsernameUnique(username);

      if (!isUnique) {
        notify(" username already exists!", 'info');
        return;
      }

      createUserWithEmailAndPassword(auth, email, password)
        .then(async (result) => {
          await setDoc(doc(db, "users", result.user.uid), {
            uid: result.user.uid,
            username: username,
            email: email,
            dob: "",
            phoneNumber: "",
            bio: "",
            displayName: firstName + " " + lastName,
            name: {
              first: firstName,
              last: lastName,
            },
            address: {
              street: "",
              city: "",
              state: "",
              zip: "",
            },
            root: false,
          });
          notify("Account Created!", "succes");
          currentUser &&  verifyEmail(result.user);
        })
        .catch((error) => {
          if (error.code == "auth/email-already-in-use")
            notify("Email Already In Use, Continue to Login!", 'error');
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    signOut(auth)
      .then((result) => {
        notify("Signed Out");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const verifyEmail = (user) => {
    user &&
      sendEmailVerification(user)
        .then((result) => {
          notify(
            "Email Verification link Sent, please verify your email!",
            "info"
          );
        })
        .catch((error) => {
          console.error(error);
        });
  };

  const updatePassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then((result) => {
        notify("password rest link sent on your email", 'info');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const forgotPassword = async (email) => {
    try {
      if (isValidEmail(identifier)) {
        sendPasswordResetEmail(auth, identifier)
          .then((result) => {
            notify("Password Email Link sent!");
          })
          .catch((error) => {
            if (error.code == "auth/missing-email")
              console.error("Login Error: ", error);
          });
      } else {
        const email = await getUserEmailByUsername(identifier);
        sendPasswordResetEmail(auth, email)
          .then((result) => {
            notify("Password email link sent!");
          })
          .catch((error) => {
            if (error.code == "auth/missing-email")
              console.error("Login Error: ", error);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getUserData = useCallback(async (uid) => {
    const userDocRef = doc(db, "users", uid);
    return getDoc(userDocRef)
      .then((doc) => {
        if (doc.exists()) {
          return doc.data();
        } else {
          notify("No such document!");
          return null;
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
        return null;
      });
  }, []);

  const isValidEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const getUserEmailByUsername = async (username) => {
    try {
      const q = query(
        collection(db, "users"),
        where("username", "==", username)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        return userData.email;
      } else {
        notify(`No user found with the username: ${username}`, 'error');
        return null;      }
    } catch (error) {
      console.error("Error getting user email by username:", error);
      return null;
    }
  };

  const isUsernameUnique = async (username) => {
    try {
      const q = query(
        collection(db, "users"),
        where("username", "==", username)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return true;
      }

      const existingUser = querySnapshot.docs[0].data();
      const existingUserId = existingUser.uid;

      return currentUser.uid === existingUserId;
    } catch (error) {
      console.error("Error checking username uniqueness:", error);
      return false;
    }
  };

  const updateCurrentUser = async (inputRefs) => {
    try {
      const username = inputRefs.username.current.value;
      const email = inputRefs.email.current.value;
      const password = inputRefs.password.current.value;
      const first = inputRefs.name.first.current.value;
      const last = inputRefs.name.last.current.value;
      const street = inputRefs.address.street.current.value;
      const city = inputRefs.address.city.current.value;
      const state = inputRefs.address.state.current.value;
      const zip = inputRefs.address.zip.current.value;
      const dob = inputRefs.dob.current.value;
      const phoneNumber = inputRefs.phone.current.value;
      const bio = inputRefs.bio.current.value;


      if (await isUsernameUnique(username)) {
        await updateDoc(
          doc(db, "users", currentUser.uid),
          {
            username: username,
            email: email,
            password: password,
            name: {
              first: first,
              last: last,
            },
            address: {
              street: street,
              city: city,
              state: state,
              zip: zip,
            },
            dob: dob,
            phoneNumber: phoneNumber,
            bio: bio,
          },
          { merge: true }
        );

        authStateListener();
      } else {
        notify(
          "Username already exists. Please choose a different username.", 'error'
        );
      }
    } catch (error) {
      console.error("Error updating current user:", error);
    }
  };

  const authStateListener = useCallback(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = getUserData(user.uid);
        userData.then((data) => {
          setCurrentUser(data);
        });
      } else {
        setCurrentUser(null);
      }
    });
  }, [getUserData, setCurrentUser]);

  useEffect(() => {
    const unsubscribe = authStateListener();

    return () => {
      unsubscribe();
    };
  }, [authStateListener]);

  const value = {
    currentUser,
    updateCurrentUser,
    login,
    logout,
    signup,
    verifyEmail,
    updatePassword,
    forgotPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
