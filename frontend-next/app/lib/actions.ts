import { signIn } from "next-auth/react";
// import { AuthError } from "next-auth";

export const authenticate = async (email: string, password: string) => {
  try {
    // const formData = new FormData();
    // formData.set("email", email);
    // formData.set("password", password);
    // console.log({ formData });
    await signIn("credentials", { email, password });
  } catch (error) {
    console.log({ error });
    if (error instanceof Error) {
    //   switch (error.type) {
    //     case "CredentialsSignin":
    //       return "Invalid credentials.";
    //     default:
          return "Something went wrong.";
    //   }
    }
    throw error;
  }
};
