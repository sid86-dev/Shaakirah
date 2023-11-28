import { User } from "@/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

type UserContextType = {
  user: undefined | User | null;
  setUser: React.Dispatch<React.SetStateAction<null | undefined | User>>;
};

const initialUserContext: UserContextType = {
  user: undefined,
  setUser: () => {},
};

export const UserContext = createContext<UserContextType>(initialUserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<undefined | User | null>(undefined);

  const userContextValue: UserContextType = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
