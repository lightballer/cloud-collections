'use client';

import { getUserInfo } from "@/app/lib/http/auth";

const useAuth = () => {
  const getUser = async (token: string) => {
    const user = await getUserInfo(token);
    return user;
  };

  const logout = (): boolean => {
    try {
      sessionStorage.removeItem("token");
      return true;
    } catch (err) {
      return false;
    }
  };

  const saveToken = (token: string): boolean => {
    try {
      sessionStorage.setItem("token", token);
      return true;
    } catch (err) {
      return false;
    }
  };

  const getToken = (): string => {
    return sessionStorage.getItem("token") || "";
  };

  return { getUser, logout, saveToken, getToken };
};

export default useAuth;
