"use client";

import React, { createContext, useContext, useState } from "react";

interface UserContextProps {
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
}

export const UserContext = createContext<UserContextProps>({
  username: null,
  setUsername: () => {},
});

export function useUserContext() {
  const context = useContext(UserContext);
  return context;
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<UserContextProps["username"] | null>(
    null
  );

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}
