import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const useCheckAuthentication = (redirectPath: string) => {
  const session = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (session?.status === "authenticated") {
      redirect(redirectPath);
    } else if (session?.status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [redirectPath, session?.status]);

  return { isLoading };
};

export default useCheckAuthentication;
