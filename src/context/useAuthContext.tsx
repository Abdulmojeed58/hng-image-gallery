import { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

type IAuthContext = {
  currentUser: User | null;
  handleSignup: (email: string, password: string) => void;
  handleLogin: (email: string, password: string) => void;
  loginState: {
    isLoading: boolean;
    message: string | null;
    success: boolean;
  };
  handleLogout: () => void;
};

const AuthContext = createContext({} as IAuthContext);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loginState, setLoginState] = useState<{
    isLoading: boolean;
    message: string | null;
    success: boolean;
  }>({
    isLoading: false,
    message: null,
    success: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      // Unsubscribe when component unmounts
      unsubscribe();
    };
  }, []);

  const handleSignup = (email: string, password: string) => {
    setLoginState({
      isLoading: true,
      message: null,
      success: false,
    });
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setLoginState({
          isLoading: false,
          message: "You are logged in",
          success: true,
        });
        setCurrentUser(user);
        toast.success("You are logged in");

        window.location.replace("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        setLoginState({
          isLoading: false,
          message: "Failed to Sign up",
          success: false,
        });
        toast.error("Faield to Signup");

        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  const handleLogin = (email: string, password: string) => {
    setLoginState({
      isLoading: true,
      message: null,
      success: false,
    });
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setLoginState({
          isLoading: false,
          message: "You are logged in",
          success: true,
        });
        setCurrentUser(user);
        toast.success("You are logged in");

        window.location.replace("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        setLoginState({
          isLoading: false,
          message: "Failed to Login",
          success: false,
        });
        toast.error("Incorrect Username or Password");

        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setCurrentUser(null);
        toast.success("Logout Successfully");
      })
      .catch((error) => {
        console.log("Logout Error", error);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        handleSignup,
        handleLogin,
        currentUser,
        loginState,
        handleLogout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuthContext: any = () => {
  return useContext(AuthContext);
};

export default AppProvider;
