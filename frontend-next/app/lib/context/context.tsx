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

  // const { getToken, getUser } = useAuth();

  
  // useEffect(() => {
  //   console.log('page root')
  //   const token = getToken();
  //   console.log({ token });
  //   if (!token) {
  //     redirect("/login");
  //   } else {
  //     getUser(token).then((username) => {
  //       console.log({ username });
  //       setUsername(username);
  //     });
  //   }
  // }, []);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}
