
import { useState } from "react";
import { auth } from "@/auth";

export function useGetToken() {
//   const [token, setToken] = useState("");

  auth((req) => {
    console.log({ req });
    console.log(req.cookies);
    // setToken(req.cookies);
  });
  const token = "";
  return token;
}
