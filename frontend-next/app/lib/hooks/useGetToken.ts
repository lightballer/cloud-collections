import { useSession } from "next-auth/react";

const useGetToken = () => {
  const session = useSession();
  const token = session?.data?.user?.access_token || "";

  return { token };
};

export default useGetToken;
