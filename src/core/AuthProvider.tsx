import { createContext, FC, useState } from "react";

export const authContext = createContext({
  signIn: (value: { email: string; password: string }) => {},
  signOut: () => {},
  user: { name: "", email: "" },
});

const useProvideAuth = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const signIn = ({ email, password }: { email: string; password: string }) => {
    if (email === "admin@test.com" && password === "admin") {
      return setUser({
        name: "Admin",
        email: "admin@test.com",
      });
    }
  };

  const signOut = () => {
    return setUser({
      name: "",
      email: "",
    });
  };

  return { signIn, user, signOut };
};

const AuthProvider: FC = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export default AuthProvider;
