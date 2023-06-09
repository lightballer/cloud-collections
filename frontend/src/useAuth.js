import { getUserInfo } from "http/auth";

const useAuth = () => {
  const getUser = async (token) => {
    const user = await getUserInfo(token);
    return user;
  };

  const logout = () => {
    try {
      sessionStorage.removeItem("token");
      return true;
    } catch (err) {
      return false;
    }
  };

  const saveToken = (token) => {
    try {
      sessionStorage.setItem("token", token);
      return true;
    } catch (err) {
      return false;
    }
  };

  const getToken = () => {
    return sessionStorage.getItem("token");
  };

  return { getUser, logout, saveToken, getToken };
};

export default useAuth;
