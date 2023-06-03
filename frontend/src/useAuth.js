import { getUserInfo } from "components/http/auth";

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
  }

  return { getUser, logout, saveToken };
};

export default useAuth;
