import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export const authenticate = async (email: string, password: string) => {
  try {
    const result = await signIn(
      "credentials",
      { email, password }
      // { callbackUrl: `${window.location.origin}/files` }
    );
    console.log({ result });
    if (result?.error) {
      throw result.error;
    } else {
      redirect("/");
    }
  } catch (error) {
    console.log({ error });
    if (error instanceof Error) {
      return "Something went wrong.";
    }
    throw error;
  }
};
