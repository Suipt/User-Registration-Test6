import React, { useState, createContext, useContext } from "react";

const defaultValue = {
  user: {
    name: "",
    email: "",
    isAuthenticated: false,
    isVerified: false,
  },
  setUser: () => {},
};

const UserContext = createContext(defaultValue);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    isAuthenticated: false,
    isVerified: false,
  });

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};
