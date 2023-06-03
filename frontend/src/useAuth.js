import { getUserInfo } from "components/http/auth";

const useAuth = () => {
  const getUser = async (token) => {
    const user = await getUserInfo(token);
    return user;
  };

  return { getUser };
};

export default useAuth;
